import EmpleadoModel from "@models/EmpleadoModel";
import EmpleadoService from "@services/EmpleadoService";
import { Request, Response } from "express";

class EmpleadoController {
    static async getAll(request: Request, response: Response) {
        try {
            const empleados = await EmpleadoModel.getAll();
            response.status(200).json({ message: "Empleados obtenidos", data: empleados });
        } catch (error) {
            response.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    static async getActive(request: Request, response: Response) {
        try {
            const empleados = await EmpleadoModel.getActive();
            response.status(200).json({ message: "Empleados activos obtenidos", data: empleados });
        } catch (error) {
            response.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    static async getById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const empleado = await EmpleadoModel.getById(Number(id));

            if (!empleado || empleado.length === 0) {
                response.status(404).json({ message: "Empleado no encontrado" });
                return;
            }

            response.status(200).json({ message: "Empleado obtenido", data: empleado[0] });
        } catch (error) {
            response.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    static async create(request: Request, response: Response) {
        try {
            const { nombre, apellido, email, telefono, cargo, fotoBase64 } = request.body;

            const empleado = await EmpleadoService.createEmpleado(
                nombre,
                apellido,
                email,
                telefono,
                cargo,
                fotoBase64
            );

            response.status(201).json({ message: "Empleado creado exitosamente", data: empleado[0] });
        } catch (error: any) {
            if (error.message.includes('foto')) {
                response.status(400).json({ message: error.message });
            } else if (error.code === 'ER_DUP_ENTRY') {
                response.status(409).json({ message: "El email ya está registrado" });
            } else {
                response.status(500).json({ message: "Error interno del servidor", error });
            }
        }
    }

    static async update(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { nombre, apellido, email, telefono, cargo, fotoBase64 } = request.body;

            const empleado = await EmpleadoService.updateEmpleado(
                Number(id),
                nombre,
                apellido,
                email,
                telefono,
                cargo,
                fotoBase64
            );

            response.status(200).json({ message: "Empleado actualizado exitosamente", data: empleado[0] });
        } catch (error: any) {
            if (error.message === 'Empleado no encontrado') {
                response.status(404).json({ message: error.message });
            } else if (error.message.includes('foto')) {
                response.status(400).json({ message: error.message });
            } else if (error.code === 'ER_DUP_ENTRY') {
                response.status(409).json({ message: "El email ya está registrado" });
            } else {
                response.status(500).json({ message: "Error interno del servidor", error });
            }
        }
    }

    static async toggleEstado(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const empleado = await EmpleadoModel.toggleEstado(Number(id));

            if (!empleado || empleado.length === 0) {
                response.status(404).json({ message: "Empleado no encontrado" });
                return;
            }

            response.status(200).json({
                message: `Empleado ${empleado[0].estado === 'activo' ? 'activado' : 'desactivado'} exitosamente`,
                data: empleado[0]
            });
        } catch (error) {
            response.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    static async delete(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const empleado = await EmpleadoService.deleteEmpleado(Number(id));

            response.status(200).json({ message: "Empleado eliminado exitosamente", data: empleado[0] });
        } catch (error: any) {
            if (error.message === 'Empleado no encontrado') {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: "Error interno del servidor", error });
            }
        }
    }
}

export default EmpleadoController;