import { Request, Response } from "express";
import CitaService from "@services/CitaService";

class CitaController {
    static async list(req: Request, res: Response) {
        try {
            const { cliente_id, servicio_id, fecha, estado } = req.query;
            const filtros = {
                clienteId: cliente_id ? Number(cliente_id) : undefined,
                servicioId: servicio_id ? Number(servicio_id) : undefined,
                fecha: typeof fecha === "string" ? fecha : undefined,
                estado: typeof estado === "string" ? (estado as any) : undefined
            };

            const citas = await CitaService.listarCitas(filtros);
            res.json({ success: true, data: citas });
        } catch (error: any) {
            console.error("Error listando citas:", error);
            res.status(500).json({ success: false, message: "Error interno del servidor" });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cita = await CitaService.obtenerCita(Number(id));
            res.json({ success: true, data: cita });
        } catch (error: any) {
            console.error("Error obteniendo cita:", error);
            if (error.message === "Cita no encontrada") {
                res.status(404).json({ success: false, message: error.message });
                return;
            }
            res.status(500).json({ success: false, message: "Error interno del servidor" });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const cita = await CitaService.crearCita(req.body);
            res.status(201).json({ success: true, message: "Cita creada", data: cita });
        } catch (error: any) {
            console.error("Error creando cita:", error);
            if (error.message.includes("Horario no disponible")) {
                res.status(409).json({ success: false, message: error.message });
            } else {
                res.status(400).json({ success: false, message: error.message || "Error creando cita" });
            }
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cita = await CitaService.actualizarCita(Number(id), req.body);
            res.json({ success: true, message: "Cita actualizada", data: cita });
        } catch (error: any) {
            console.error("Error actualizando cita:", error);
            if (error.message === "Cita no encontrada") {
                res.status(404).json({ success: false, message: error.message });
            } else if (error.message.includes("Horario no disponible")) {
                res.status(409).json({ success: false, message: error.message });
            } else {
                res.status(400).json({ success: false, message: error.message || "Error actualizando cita" });
            }
        }
    }
}

export default CitaController;
