import cloudinary from "@config/cloudinary";
import EmpleadoModel from "@models/EmpleadoModel";

class EmpleadoService {
    static async createEmpleado(nombre: string, apellido: string, email: string, telefono: string, cargo: string, fotoBase64?: string) {
        let foto_url: string | undefined;

        if (fotoBase64) {
            try {
                // Subir foto a Cloudinary
                const uploadResult = await cloudinary.uploader.upload(fotoBase64, {
                    folder: 'empleados',
                    public_id: `empleado_${Date.now()}`,
                    transformation: [
                        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
                        { quality: 'auto' }
                    ]
                });
                foto_url = uploadResult.secure_url;
            } catch (error) {
                console.error('Error subiendo foto:', error);
                throw new Error('Error al subir la foto');
            }
        }

        try {
            const empleado = await EmpleadoModel.create(nombre, apellido, email, telefono, cargo, foto_url);
            return empleado;
        } catch (error) {
            // Si hay error, intentar eliminar foto subida
            if (foto_url) {
                try {
                    const publicId = foto_url.split('/').pop()?.split('.')[0];
                    if (publicId) {
                        await cloudinary.uploader.destroy(`empleados/${publicId}`);
                    }
                } catch (deleteError) {
                    console.error('Error eliminando foto:', deleteError);
                }
            }
            throw error;
        }
    }

    static async updateEmpleado(id: number, nombre: string, apellido: string, email: string, telefono: string, cargo: string, fotoBase64?: string) {
        const empleadoActual = await EmpleadoModel.getById(id);
        if (!empleadoActual || empleadoActual.length === 0) {
            throw new Error('Empleado no encontrado');
        }

        let foto_url = empleadoActual[0].foto_url;

        if (fotoBase64) {
            try {
                // Subir nueva foto
                const uploadResult = await cloudinary.uploader.upload(fotoBase64, {
                    folder: 'empleados',
                    public_id: `empleado_${Date.now()}`,
                    transformation: [
                        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
                        { quality: 'auto' }
                    ]
                });
                foto_url = uploadResult.secure_url;

                // Eliminar foto anterior si existe
                if (empleadoActual[0].foto_url) {
                    try {
                        const publicId = empleadoActual[0].foto_url.split('/').pop()?.split('.')[0];
                        if (publicId) {
                            await cloudinary.uploader.destroy(`empleados/${publicId}`);
                        }
                    } catch (deleteError) {
                        console.error('Error eliminando foto anterior:', deleteError);
                    }
                }
            } catch (error) {
                console.error('Error subiendo foto:', error);
                throw new Error('Error al subir la foto');
            }
        }

        try {
            const empleado = await EmpleadoModel.update(id, nombre, apellido, email, telefono, cargo, foto_url);
            return empleado;
        } catch (error) {
            // Si hay error y subimos nueva foto, eliminarla
            if (fotoBase64 && foto_url !== empleadoActual[0].foto_url) {
                try {
                    const publicId = foto_url?.split('/').pop()?.split('.')[0];
                    if (publicId) {
                        await cloudinary.uploader.destroy(`empleados/${publicId}`);
                    }
                } catch (deleteError) {
                    console.error('Error eliminando foto:', deleteError);
                }
            }
            throw error;
        }
    }

    static async deleteEmpleado(id: number) {
        const empleado = await EmpleadoModel.getById(id);
        if (!empleado || empleado.length === 0) {
            throw new Error('Empleado no encontrado');
        }

        // Eliminar foto de Cloudinary si existe
        if (empleado[0].foto_url) {
            try {
                const publicId = empleado[0].foto_url.split('/').pop()?.split('.')[0];
                if (publicId) {
                    await cloudinary.uploader.destroy(`empleados/${publicId}`);
                }
            } catch (error) {
                console.error('Error eliminando foto de Cloudinary:', error);
            }
        }

        return await EmpleadoModel.delete(id);
    }
}

export default EmpleadoService;