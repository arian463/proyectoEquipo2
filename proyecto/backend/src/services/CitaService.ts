import CitaModel from "@models/CitaModel";
import DisponibilidadService from "./DisponibilidadService";
import ServicioModel from "@models/ServicioModel";

interface CrearCitaDTO {
    cliente_id: number;
    servicio_id: number;
    empleado_id?: number;
    fecha: string;
    hora_inicio: string;
    notas?: string;
    precio?: number;
}

interface ActualizarCitaDTO {
    fecha?: string;
    hora_inicio?: string;
    servicio_id?: number;
    empleado_id?: number;
    estado?: "pendiente" | "confirmada" | "completada" | "cancelada";
    notas?: string;
    precio?: number;
}

class CitaService {
    static async listarCitas(filtros: Parameters<typeof CitaModel.getAll>[0]) {
        return await CitaModel.getAll(filtros);
    }

    static async obtenerCita(id: number) {
        const cita = await CitaModel.getById(id);
        if (!cita) {
            throw new Error("Cita no encontrada");
        }
        return cita;
    }

    static async crearCita(datos: CrearCitaDTO) {
        const slots = await DisponibilidadService.obtenerSlotsDisponibles({
            fecha: datos.fecha,
            servicioId: datos.servicio_id
        });

        const slotSeleccionado = slots.find((slot) => slot.hora_inicio === datos.hora_inicio);
        if (!slotSeleccionado) {
            throw new Error("Horario no disponible en este momento");
        }

        const servicio = await ServicioModel.getById(datos.servicio_id);
        if (!servicio || servicio.length === 0) {
            throw new Error("Servicio no encontrado");
        }

        const precioFinal = datos.precio ?? servicio[0].precio;

        return await CitaModel.create({
            ...datos,
            hora_fin: slotSeleccionado.hora_fin,
            precio: precioFinal
        });
    }

    static async actualizarCita(id: number, datos: ActualizarCitaDTO) {
        const citaExistente = await CitaModel.getById(id);
        if (!citaExistente) {
            throw new Error("Cita no encontrada");
        }

        const requiereValidacion =
            Boolean(datos.fecha) || Boolean(datos.hora_inicio) || Boolean(datos.servicio_id);

        const datosActualizados: any = { ...datos };

        if (requiereValidacion) {
            const fecha = datos.fecha ?? citaExistente.fecha;
            const horaInicio = datos.hora_inicio ?? citaExistente.hora_inicio;
            const servicioId = datos.servicio_id ?? citaExistente.servicio_id;

            const slots = await DisponibilidadService.obtenerSlotsDisponibles({
                fecha,
                servicioId
            });

            const slotSeleccionado = slots.find((slot) => slot.hora_inicio === horaInicio);
            if (!slotSeleccionado) {
                throw new Error("Horario no disponible en este momento");
            }

            datosActualizados.fecha = fecha;
            datosActualizados.hora_inicio = horaInicio;
            datosActualizados.hora_fin = slotSeleccionado.hora_fin;
        } else {
            datosActualizados.hora_fin = citaExistente.hora_fin;
        }

        if (datosActualizados.precio === undefined) {
            datosActualizados.precio = citaExistente.precio;
        }

        return await CitaModel.update(id, datosActualizados);
    }

    static async obtenerDisponibilidad(fecha: string, servicioId: number) {
        return await DisponibilidadService.obtenerSlotsDisponibles({ fecha, servicioId });
    }
}

export default CitaService;
