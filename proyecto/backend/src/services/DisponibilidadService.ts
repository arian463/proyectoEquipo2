import CitaModel from "@models/CitaModel";
import NegocioModel from "@models/NegocioModel";
import ServicioModel from "@models/ServicioModel";

export interface DisponibilidadSlot {
    horario_id: number;
    hora_inicio: string;
    hora_fin: string;
}

interface ObtenerSlotsParams {
    fecha: string;
    servicioId: number;
    stepMinutes?: number;
}

class DisponibilidadService {
    private static tiempoAMinutos(tiempo: string) {
        const [hora, minuto] = tiempo.split(":").map((parte) => parseInt(parte, 10));
        return hora * 60 + minuto;
    }

    private static minutosATiempo(minutos: number) {
        const hora = Math.floor(minutos / 60);
        const minuto = minutos % 60;
        return `${hora.toString().padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;
    }

    static async obtenerSlotsDisponibles(params: ObtenerSlotsParams) {
        const { fecha, servicioId, stepMinutes = 15 } = params;

        const fechaObj = new Date(`${fecha}T00:00:00`);
        if (Number.isNaN(fechaObj.getTime())) {
            throw new Error("Fecha inválida");
        }

        const diaSemana = fechaObj.getDay();
        const horarios = await NegocioModel.getHorariosActivosPorDia(diaSemana);
        if (!horarios.length) {
            return [];
        }

        const estaDeshabilitada = await NegocioModel.isFechaDeshabilitada(fecha);
        if (estaDeshabilitada) {
            return [];
        }

        const servicio = await ServicioModel.getById(servicioId);
        if (!servicio || servicio.length === 0) {
            throw new Error("Servicio no encontrado");
        }

        const duracion = servicio[0].duracion_minutos;
        const citasYNoCanceladas = await CitaModel.getCitasPorFecha(fecha);

        const citasIntervalos = citasYNoCanceladas.map((cita: any) => ({
            inicio: this.tiempoAMinutos(cita.hora_inicio),
            fin: this.tiempoAMinutos(cita.hora_fin)
        }));

        const hoy = new Date();
        const hoyStr = `${hoy.getFullYear().toString().padStart(4, "0")}-${(hoy.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${hoy.getDate().toString().padStart(2, "0")}`;
        const minutosActuales = hoy.getHours() * 60 + hoy.getMinutes();

        const slots: DisponibilidadSlot[] = [];

        for (const horario of horarios) {
            const inicioHorario = this.tiempoAMinutos(horario.hora_inicio);
            const finHorario = this.tiempoAMinutos(horario.hora_fin);
            const ultimoInicio = finHorario - duracion;

            if (ultimoInicio < inicioHorario) {
                continue;
            }

            for (let slotInicio = inicioHorario; slotInicio <= ultimoInicio; slotInicio += stepMinutes) {
                const slotFin = slotInicio + duracion;

                if (fecha === hoyStr && slotInicio < minutosActuales) {
                    continue;
                }

                const conflicto = citasIntervalos.some(
                    (intervalo: { inicio: number; fin: number }) =>
                        slotInicio < intervalo.fin && slotFin > intervalo.inicio
                );

                if (!conflicto) {
                    slots.push({
                        horario_id: horario.id,
                        hora_inicio: this.minutosATiempo(slotInicio),
                        hora_fin: this.minutosATiempo(slotFin)
                    });
                }
            }
        }

        return slots;
    }
}

export default DisponibilidadService;
