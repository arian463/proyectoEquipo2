import ServicioModel from "@models/ServicioModel";
import ServicioService from "@services/ServicioService";
import { Request, Response } from "express";

class ServicioController {
    static async getAll(request: Request, response: Response) {
        try {
            const servicios = await ServicioModel.getAll();
            response.status(200).json({ message: "Servicios obtenidos", data: servicios });
        } catch (error) {
            response.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    static async getActive(request: Request, response: Response) {
        try {
            const servicios = await ServicioModel.getActive();
            response.status(200).json({ message: "Servicios activos obtenidos", data: servicios });
        } catch (error) {
            response.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    static async getById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const servicio = await ServicioModel.getById(Number(id));

            if (!servicio || servicio.length === 0) {
                response.status(404).json({ message: "Servicio no encontrado" });
                return;
            }

            response.status(200).json({ message: "Servicio obtenido", data: servicio[0] });
        } catch (error) {
            response.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    static async create(request: Request, response: Response) {
        try {
            const { nombre, descripcion, precio, duracion_minutos, imagenBase64 } = request.body;

            const servicio = await ServicioService.createServicio(
                nombre,
                descripcion,
                parseFloat(precio),
                parseInt(duracion_minutos),
                imagenBase64
            );

            response.status(201).json({ message: "Servicio creado exitosamente", data: servicio[0] });
        } catch (error: any) {
            if (error.message.includes('imagen')) {
                response.status(400).json({ message: error.message });
            } else {
                response.status(500).json({ message: "Error interno del servidor", error });
            }
        }
    }

    static async update(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { nombre, descripcion, precio, duracion_minutos, imagenBase64 } = request.body;

            const servicio = await ServicioService.updateServicio(
                Number(id),
                nombre,
                descripcion,
                parseFloat(precio),
                parseInt(duracion_minutos),
                imagenBase64
            );

            response.status(200).json({ message: "Servicio actualizado exitosamente", data: servicio[0] });
        } catch (error: any) {
            if (error.message === 'Servicio no encontrado') {
                response.status(404).json({ message: error.message });
            } else if (error.message.includes('imagen')) {
                response.status(400).json({ message: error.message });
            } else {
                response.status(500).json({ message: "Error interno del servidor", error });
            }
        }
    }

    static async toggleActive(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const servicio = await ServicioModel.toggleActive(Number(id));

            if (!servicio || servicio.length === 0) {
                response.status(404).json({ message: "Servicio no encontrado" });
                return;
            }

            response.status(200).json({
                message: `Servicio ${servicio[0].activo ? 'activado' : 'desactivado'} exitosamente`,
                data: servicio[0]
            });
        } catch (error) {
            response.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    static async delete(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const servicio = await ServicioService.deleteServicio(Number(id));

            response.status(200).json({ message: "Servicio eliminado exitosamente", data: servicio[0] });
        } catch (error: any) {
            if (error.message === 'Servicio no encontrado') {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: "Error interno del servidor", error });
            }
        }
    }
}

export default ServicioController;