import { Request, Response } from "express";
import NegocioService from "@services/NegocioService";
import ServicioModel from "@models/ServicioModel";
import DisponibilidadService from "@services/DisponibilidadService";

class PublicController {
    static async getInfo(req: Request, res: Response) {
        try {
            const negocio = await NegocioService.getNegocio();
            const servicios = await ServicioModel.getActive();
            const horarios = await NegocioService.getHorarios();

            res.json({
                success: true,
                data: {
                    negocio,
                    servicios,
                    horarios
                }
            });
        } catch (error: any) {
            console.error("Error obteniendo información pública:", error);
            res.status(500).json({ success: false, message: "Error interno del servidor" });
        }
    }

    static async getDisponibilidad(req: Request, res: Response) {
        try {
            const { fecha, servicio_id } = req.query;

            if (!fecha || !servicio_id) {
                res.status(400).json({
                    success: false,
                    message: "Debe proporcionar fecha y servicio_id"
                });
                return;
            }

            const disponibilidad = await DisponibilidadService.obtenerSlotsDisponibles({
                fecha: fecha as string,
                servicioId: Number(servicio_id)
            });

            res.json({
                success: true,
                data: disponibilidad
            });
        } catch (error: any) {
            console.error("Error obteniendo disponibilidad pública:", error);
            res.status(400).json({ success: false, message: error.message || "Error obteniendo disponibilidad" });
        }
    }
}

export default PublicController;
