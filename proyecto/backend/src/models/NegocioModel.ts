import pool from "@config/db";

class NegocioModel {
    // === NEGOCIO ===
    static async get() {
        try {
            const [negocio] = await pool.query('SELECT * FROM negocio LIMIT 1');
            return negocio as any;
        } catch (error) {
            throw error;
        }
    }

    static async update(datos: {
        nombre?: string;
        especialidad?: string;
        descripcion?: string;
        direccion?: string;
        telefono?: string;
        correo?: string;
        whatsapp_url?: string;
        facebook_url?: string;
        instagram_url?: string;
        logo_url?: string;
        hora_apertura?: string;
        hora_cierre?: string;
    }) {
        try {
            const campos = Object.keys(datos);
            const valores = Object.values(datos);

            if (campos.length === 0) {
                throw new Error('No hay campos para actualizar');
            }

            const setClause = campos.map(campo => `${campo} = ?`).join(', ');
            const query = `UPDATE negocio SET ${setClause} WHERE id = 1`;

            await pool.query(query, valores);
            const [negocio] = await pool.query('SELECT * FROM negocio WHERE id = 1');
            return negocio as any;
        } catch (error) {
            throw error;
        }
    }

    // === HORARIOS ===
    static async getHorarios() {
        try {
            const [horarios] = await pool.query('SELECT * FROM horarios ORDER BY dia_semana ASC, hora_inicio ASC');
            return horarios as any;
        } catch (error) {
            throw error;
        }
    }

    static async getHorariosActivosPorDia(dia_semana: number) {
        try {
            const [horarios] = await pool.query(
                'SELECT * FROM horarios WHERE dia_semana = ? AND activo = 1 ORDER BY hora_inicio ASC',
                [dia_semana]
            );
            return horarios as any;
        } catch (error) {
            throw error;
        }
    }

    static async createHorario(dia_semana: number, hora_inicio: string, hora_fin: string) {
        try {
            const [result]: any = await pool.query(
                'INSERT INTO horarios (dia_semana, hora_inicio, hora_fin) VALUES (?, ?, ?)',
                [dia_semana, hora_inicio, hora_fin]
            );
            const horarioId = result.insertId;
            const [horario] = await pool.query('SELECT * FROM horarios WHERE id = ?', [horarioId]);
            return (horario as any[])[0] as any;
        } catch (error) {
            throw error;
        }
    }

    static async updateHorario(id: number, dia_semana: number, hora_inicio: string, hora_fin: string) {
        try {
            await pool.query(
                'UPDATE horarios SET dia_semana = ?, hora_inicio = ?, hora_fin = ? WHERE id = ?',
                [dia_semana, hora_inicio, hora_fin, id]
            );
            const [horario] = await pool.query('SELECT * FROM horarios WHERE id = ?', [id]);
            return horario as any;
        } catch (error) {
            throw error;
        }
    }

    static async toggleHorarioActivo(id: number) {
        try {
            await pool.query('UPDATE horarios SET activo = NOT activo WHERE id = ?', [id]);
            const [horario] = await pool.query('SELECT * FROM horarios WHERE id = ?', [id]);
            return horario as any;
        } catch (error) {
            throw error;
        }
    }

    static async deleteHorario(id: number) {
        try {
            const [horario] = await pool.query('SELECT * FROM horarios WHERE id = ?', [id]);
            await pool.query('DELETE FROM horarios WHERE id = ?', [id]);
            return horario as any;
        } catch (error) {
            throw error;
        }
    }

    // === FECHAS DESHABILITADAS ===
    static async getFechasDeshabilitadas() {
        try {
            const [fechas] = await pool.query('SELECT * FROM fechas_deshabilitadas ORDER BY fecha ASC');
            return fechas as any;
        } catch (error) {
            throw error;
        }
    }

    static async isFechaDeshabilitada(fecha: string) {
        try {
            const [fechas] = await pool.query('SELECT * FROM fechas_deshabilitadas WHERE fecha = ?', [fecha]);
            return (fechas as any[]).length > 0;
        } catch (error) {
            throw error;
        }
    }

    static async createFechaDeshabilitada(fecha: string, motivo?: string) {
        try {
            const [result]: any = await pool.query(
                'INSERT INTO fechas_deshabilitadas (fecha, motivo) VALUES (?, ?)',
                [fecha, motivo || null]
            );
            const fechaId = result.insertId;
            const [fechaDeshabilitada] = await pool.query('SELECT * FROM fechas_deshabilitadas WHERE id = ?', [fechaId]);
            return fechaDeshabilitada as any;
        } catch (error) {
            throw error;
        }
    }

    static async deleteFechaDeshabilitada(id: number) {
        try {
            const [fecha] = await pool.query('SELECT * FROM fechas_deshabilitadas WHERE id = ?', [id]);
            await pool.query('DELETE FROM fechas_deshabilitadas WHERE id = ?', [id]);
            return fecha as any;
        } catch (error) {
            throw error;
        }
    }
}

export default NegocioModel;
