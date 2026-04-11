import { Request, Response } from 'express';
import ClienteService from '@services/ClienteService';

class ClienteController {
    static async getAll(req: Request, res: Response) {
        try {
            const clientes = await ClienteService.getAllClientes();
            res.json({
                success: true,
                data: clientes
            });
        } catch (error: any) {
            console.error('Error obteniendo clientes:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cliente = await ClienteService.getClienteById(parseInt(id as string));
            res.json({
                success: true,
                data: cliente
            });
        } catch (error: any) {
            console.error('Error obteniendo cliente:', error);
            if (error.message === 'Cliente no encontrado') {
                res.status(404).json({
                    success: false,
                    message: error.message
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor'
                });
            }
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const cliente = await ClienteService.createCliente(req.body);
            res.status(201).json({
                success: true,
                message: 'Cliente creado exitosamente',
                data: cliente
            });
        } catch (error: any) {
            console.error('Error creando cliente:', error);
            if (error.message.includes('correo electrónico')) {
                res.status(409).json({
                    success: false,
                    message: error.message
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Error creando cliente'
                });
            }
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cliente = await ClienteService.updateCliente(parseInt(id as string), req.body);
            res.json({
                success: true,
                message: 'Cliente actualizado exitosamente',
                data: cliente
            });
        } catch (error: any) {
            console.error('Error actualizando cliente:', error);
            if (error.message === 'Cliente no encontrado') {
                res.status(404).json({
                    success: false,
                    message: error.message
                });
            } else if (error.message.includes('correo electrónico')) {
                res.status(409).json({
                    success: false,
                    message: error.message
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Error actualizando cliente'
                });
            }
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cliente = await ClienteService.deleteCliente(parseInt(id as string));
            res.json({
                success: true,
                message: 'Cliente eliminado exitosamente',
                data: cliente
            });
        } catch (error: any) {
            console.error('Error eliminando cliente:', error);
            if (error.message === 'Cliente no encontrado') {
                res.status(404).json({
                    success: false,
                    message: error.message
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: error.message || 'Error eliminando cliente'
                });
            }
        }
    }

    static async search(req: Request, res: Response) {
        try {
            const { q } = req.query;
            const clientes = await ClienteService.searchClientes(q as string);
            res.json({
                success: true,
                data: clientes
            });
        } catch (error: any) {
            console.error('Error buscando clientes:', error);
            res.status(400).json({
                success: false,
                message: error.message || 'Error en la búsqueda'
            });
        }
    }
}

export default ClienteController;