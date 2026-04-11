import { Request, Response } from 'express';
import NegocioService from '@services/NegocioService';

class NegocioController {
    // === NEGOCIO ===
    static async get(req: Request, res: Response) {
        try {
            const negocio = await NegocioService.getNegocio();
            res.json({
                success: true,
                data: negocio
            });
        } catch (error: any) {
            console.error('Error obteniendo negocio:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const negocio = await NegocioService.updateNegocio(req.body);
            res.json({
                success: true,
                message: 'Negocio actualizado exitosamente',
                data: negocio
            });
        } catch (error: any) {
            console.error('Error actualizando negocio:', error);
            if (error.message.includes('Cloudinary')) {
                res.status(500).json({
                    success: false,
                    message: 'Error procesando la imagen del logo'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Error actualizando negocio'
                });
            }
        }
    }

    // === HORARIOS ===
    static async getHorarios(req: Request, res: Response) {
        try {
            const horarios = await NegocioService.getHorarios();
            res.json({
                success: true,
                data: horarios
            });
        } catch (error: any) {
            console.error('Error obteniendo horarios:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    static async createHorario(req: Request, res: Response) {
        try {
            const { dia_semana, hora_inicio, hora_fin } = req.body;
            const horario = await NegocioService.createHorario(dia_semana, hora_inicio, hora_fin);
            res.status(201).json({
                success: true,
                message: 'Horario creado exitosamente',
                data: horario
            });
        } catch (error: any) {
            console.error('Error creando horario:', error);
            res.status(400).json({
                success: false,
                message: error.message || 'Error creando horario'
            });
        }
    }

    static async updateHorario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { dia_semana, hora_inicio, hora_fin } = req.body;
            const horario = await NegocioService.updateHorario(parseInt(id as string), dia_semana, hora_inicio, hora_fin);
            res.json({
                success: true,
                message: 'Horario actualizado exitosamente',
                data: horario
            });
        } catch (error: any) {
            console.error('Error actualizando horario:', error);
            res.status(400).json({
                success: false,
                message: error.message || 'Error actualizando horario'
            });
        }
    }

    static async toggleHorarioActivo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const horario = await NegocioService.toggleHorarioActivo(parseInt(id as string));
            res.json({
                success: true,
                message: `Horario ${horario.activo ? 'activado' : 'desactivado'} exitosamente`,
                data: horario
            });
        } catch (error: any) {
            console.error('Error cambiando estado del horario:', error);
            res.status(400).json({
                success: false,
                message: error.message || 'Error cambiando estado del horario'
            });
        }
    }

    static async deleteHorario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const horario = await NegocioService.deleteHorario(parseInt(id as string));
            res.json({
                success: true,
                message: 'Horario eliminado exitosamente',
                data: horario
            });
        } catch (error: any) {
            console.error('Error eliminando horario:', error);
            res.status(400).json({
                success: false,
                message: error.message || 'Error eliminando horario'
            });
        }
    }

    // === FECHAS DESHABILITADAS ===
    static async getFechasDeshabilitadas(req: Request, res: Response) {
        try {
            const fechas = await NegocioService.getFechasDeshabilitadas();
            res.json({
                success: true,
                data: fechas
            });
        } catch (error: any) {
            console.error('Error obteniendo fechas deshabilitadas:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    static async createFechaDeshabilitada(req: Request, res: Response) {
        try {
            const { fecha, motivo } = req.body;
            const fechaDeshabilitada = await NegocioService.createFechaDeshabilitada(fecha, motivo);
            res.status(201).json({
                success: true,
                message: 'Fecha deshabilitada creada exitosamente',
                data: fechaDeshabilitada
            });
        } catch (error: any) {
            console.error('Error creando fecha deshabilitada:', error);
            res.status(400).json({
                success: false,
                message: error.message || 'Error creando fecha deshabilitada'
            });
        }
    }

    static async deleteFechaDeshabilitada(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const fecha = await NegocioService.deleteFechaDeshabilitada(parseInt(id as string));
            res.json({
                success: true,
                message: 'Fecha deshabilitada eliminada exitosamente',
                data: fecha
            });
        } catch (error: any) {
            console.error('Error eliminando fecha deshabilitada:', error);
            res.status(400).json({
                success: false,
                message: error.message || 'Error eliminando fecha deshabilitada'
            });
        }
    }
}

export default NegocioController;