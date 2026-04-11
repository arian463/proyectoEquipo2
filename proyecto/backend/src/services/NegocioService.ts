import NegocioModel from "@models/NegocioModel";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

class NegocioService {
    static async getNegocio() {
        try {
            const negocio = await NegocioModel.get();
            return negocio;
        } catch (error) {
            throw error;
        }
    }

    static async updateNegocio(datos: {
        nombre?: string;
        especialidad?: string;
        descripcion?: string;
        direccion?: string;
        telefono?: string;
        correo?: string;
        whatsapp_url?: string;
        facebook_url?: string;
        instagram_url?: string;
        logo_base64?: string;
        hora_apertura?: string;
        hora_cierre?: string;
    }) {
        try {
            let logo_url = undefined;

            // Si se proporciona un logo en base64, subirlo a Cloudinary
            if (datos.logo_base64) {
                // Obtener el negocio actual para saber si hay un logo anterior
                const negocioActual = await NegocioModel.get();

                // Si hay un logo anterior, eliminarlo de Cloudinary
                if (negocioActual && negocioActual.logo_url) {
                    try {
                        const publicId = negocioActual.logo_url.split('/').pop()?.split('.')[0];
                        if (publicId) {
                            await cloudinary.uploader.destroy(`negocio_logos/${publicId}`);
                        }
                    } catch (cloudinaryError) {
                        console.warn('Error eliminando logo anterior de Cloudinary:', cloudinaryError);
                    }
                }

                // Subir el nuevo logo
                const base64Data = datos.logo_base64.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');

                const uploadResult: any = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        {
                            folder: 'negocio_logos',
                            transformation: [
                                { width: 300, height: 300, crop: 'fill' },
                                { quality: 'auto' }
                            ]
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    ).end(buffer);
                });

                logo_url = uploadResult.secure_url;
            }

            // Preparar datos para actualizar
            const datosActualizar: any = { ...datos };
            delete datosActualizar.logo_base64;
            if (logo_url) {
                datosActualizar.logo_url = logo_url;
            }

            const negocio = await NegocioModel.update(datosActualizar);
            return negocio;
        } catch (error) {
            throw error;
        }
    }

    // === HORARIOS ===
    static async getHorarios() {
        try {
            const horarios = await NegocioModel.getHorarios();
            return horarios;
        } catch (error) {
            throw error;
        }
    }

    static async createHorario(dia_semana: number, hora_inicio: string, hora_fin: string) {
        try {
            // Validar que el día de la semana esté entre 0-6
            if (dia_semana < 0 || dia_semana > 6) {
                throw new Error('El día de la semana debe estar entre 0 (domingo) y 6 (sábado)');
            }

            // Validar formato de hora (HH:MM)
            const horaRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!horaRegex.test(hora_inicio) || !horaRegex.test(hora_fin)) {
                throw new Error('Las horas deben estar en formato HH:MM');
            }

            // Validar que hora_inicio sea menor que hora_fin
            if (hora_inicio >= hora_fin) {
                throw new Error('La hora de inicio debe ser menor que la hora de fin');
            }

            const horario = await NegocioModel.createHorario(dia_semana, hora_inicio, hora_fin);
            return horario;
        } catch (error) {
            throw error;
        }
    }

    static async updateHorario(id: number, dia_semana: number, hora_inicio: string, hora_fin: string) {
        try {
            // Validar que el día de la semana esté entre 0-6
            if (dia_semana < 0 || dia_semana > 6) {
                throw new Error('El día de la semana debe estar entre 0 (domingo) y 6 (sábado)');
            }

            // Validar formato de hora (HH:MM)
            const horaRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!horaRegex.test(hora_inicio) || !horaRegex.test(hora_fin)) {
                throw new Error('Las horas deben estar en formato HH:MM');
            }

            // Validar que hora_inicio sea menor que hora_fin
            if (hora_inicio >= hora_fin) {
                throw new Error('La hora de inicio debe ser menor que la hora de fin');
            }

            const horario = await NegocioModel.updateHorario(id, dia_semana, hora_inicio, hora_fin);
            return horario;
        } catch (error) {
            throw error;
        }
    }

    static async toggleHorarioActivo(id: number) {
        try {
            const horario = await NegocioModel.toggleHorarioActivo(id);
            return horario;
        } catch (error) {
            throw error;
        }
    }

    static async deleteHorario(id: number) {
        try {
            const horario = await NegocioModel.deleteHorario(id);
            return horario;
        } catch (error) {
            throw error;
        }
    }

    // === FECHAS DESHABILITADAS ===
    static async getFechasDeshabilitadas() {
        try {
            const fechas = await NegocioModel.getFechasDeshabilitadas();
            return fechas;
        } catch (error) {
            throw error;
        }
    }

    static async createFechaDeshabilitada(fecha: string, motivo?: string) {
        try {
            // Validar formato de fecha (YYYY-MM-DD)
            const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!fechaRegex.test(fecha)) {
                throw new Error('La fecha debe estar en formato YYYY-MM-DD');
            }

            // Validar que la fecha no sea en el pasado
            const fechaObj = new Date(fecha + 'T00:00:00');
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            if (fechaObj < hoy) {
                throw new Error('No se pueden deshabilitar fechas en el pasado');
            }

            const fechaDeshabilitada = await NegocioModel.createFechaDeshabilitada(fecha, motivo);
            return fechaDeshabilitada;
        } catch (error) {
            throw error;
        }
    }

    static async deleteFechaDeshabilitada(id: number) {
        try {
            const fecha = await NegocioModel.deleteFechaDeshabilitada(id);
            return fecha;
        } catch (error) {
            throw error;
        }
    }
}

export default NegocioService;
