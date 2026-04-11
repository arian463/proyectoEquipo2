import cloudinary from "@config/cloudinary";
import ServicioModel from "@models/ServicioModel";

class ServicioService {
    static async createServicio(nombre: string, descripcion: string, precio: number, duracion_minutos: number, imagenBase64?: string) {
        let imagen_url: string | undefined;

        if (imagenBase64) {
            try {
                // Subir imagen a Cloudinary
                const uploadResult = await cloudinary.uploader.upload(imagenBase64, {
                    folder: 'servicios',
                    public_id: `servicio_${Date.now()}`,
                    transformation: [
                        { width: 800, height: 600, crop: 'limit' },
                        { quality: 'auto' }
                    ]
                });
                imagen_url = uploadResult.secure_url;
            } catch (error) {
                console.error('Error subiendo imagen:', error);
                throw new Error('Error al subir la imagen');
            }
        }

        try {
            const servicio = await ServicioModel.create(nombre, descripcion, precio, duracion_minutos, imagen_url);
            return servicio;
        } catch (error) {
            // Si hay error, intentar eliminar imagen subida
            if (imagen_url) {
                try {
                    const publicId = imagen_url.split('/').pop()?.split('.')[0];
                    if (publicId) {
                        await cloudinary.uploader.destroy(`servicios/${publicId}`);
                    }
                } catch (deleteError) {
                    console.error('Error eliminando imagen:', deleteError);
                }
            }
            throw error;
        }
    }

    static async updateServicio(id: number, nombre: string, descripcion: string, precio: number, duracion_minutos: number, imagenBase64?: string) {
        const servicioActual = await ServicioModel.getById(id);
        if (!servicioActual || servicioActual.length === 0) {
            throw new Error('Servicio no encontrado');
        }

        let imagen_url = servicioActual[0].imagen_url;

        if (imagenBase64) {
            try {
                // Subir nueva imagen
                const uploadResult = await cloudinary.uploader.upload(imagenBase64, {
                    folder: 'servicios',
                    public_id: `servicio_${Date.now()}`,
                    transformation: [
                        { width: 800, height: 600, crop: 'limit' },
                        { quality: 'auto' }
                    ]
                });
                imagen_url = uploadResult.secure_url;

                // Eliminar imagen anterior si existe
                if (servicioActual[0].imagen_url) {
                    try {
                        const publicId = servicioActual[0].imagen_url.split('/').pop()?.split('.')[0];
                        if (publicId) {
                            await cloudinary.uploader.destroy(`servicios/${publicId}`);
                        }
                    } catch (deleteError) {
                        console.error('Error eliminando imagen anterior:', deleteError);
                    }
                }
            } catch (error) {
                console.error('Error subiendo imagen:', error);
                throw new Error('Error al subir la imagen');
            }
        }

        try {
            const servicio = await ServicioModel.update(id, nombre, descripcion, precio, duracion_minutos, imagen_url);
            return servicio;
        } catch (error) {
            // Si hay error y subimos nueva imagen, eliminarla
            if (imagenBase64 && imagen_url !== servicioActual[0].imagen_url) {
                try {
                    const publicId = imagen_url?.split('/').pop()?.split('.')[0];
                    if (publicId) {
                        await cloudinary.uploader.destroy(`servicios/${publicId}`);
                    }
                } catch (deleteError) {
                    console.error('Error eliminando imagen:', deleteError);
                }
            }
            throw error;
        }
    }

    static async deleteServicio(id: number) {
        const servicio = await ServicioModel.getById(id);
        if (!servicio || servicio.length === 0) {
            throw new Error('Servicio no encontrado');
        }

        // Eliminar imagen de Cloudinary si existe
        if (servicio[0].imagen_url) {
            try {
                const publicId = servicio[0].imagen_url.split('/').pop()?.split('.')[0];
                if (publicId) {
                    await cloudinary.uploader.destroy(`servicios/${publicId}`);
                }
            } catch (error) {
                console.error('Error eliminando imagen de Cloudinary:', error);
            }
        }

        return await ServicioModel.delete(id);
    }
}

export default ServicioService;