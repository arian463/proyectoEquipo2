import pool from "@config/db";

class ServicioModel {
    static async getAll() {
        try {
            const [servicios] = await pool.query('SELECT * FROM servicios ORDER BY created_at DESC');
            return servicios as any;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id: number) {
        try {
            const [servicio] = await pool.query('SELECT * FROM servicios WHERE id = ?', [id]);
            return servicio as any;
        } catch (error) {
            throw error;
        }
    }

    static async getActive() {
        try {
            const [servicios] = await pool.query('SELECT * FROM servicios WHERE activo = 1 ORDER BY nombre ASC');
            return servicios as any;
        } catch (error) {
            throw error;
        }
    }

    static async create(nombre: string, descripcion: string, precio: number, duracion_minutos: number, imagen_url?: string) {
        try {
            const [result]: any = await pool.query(
                'INSERT INTO servicios (nombre, descripcion, precio, duracion_minutos, imagen_url) VALUES (?, ?, ?, ?, ?)',
                [nombre, descripcion, precio, duracion_minutos, imagen_url || null]
            );
            const servicioId = result.insertId;
            const [servicio] = await pool.query('SELECT * FROM servicios WHERE id = ?', [servicioId]);
            return servicio as any;
        } catch (error) {
            throw error;
        }
    }

    static async update(id: number, nombre: string, descripcion: string, precio: number, duracion_minutos: number, imagen_url?: string) {
        try {
            await pool.query(
                'UPDATE servicios SET nombre = ?, descripcion = ?, precio = ?, duracion_minutos = ?, imagen_url = ? WHERE id = ?',
                [nombre, descripcion, precio, duracion_minutos, imagen_url || null, id]
            );
            const [servicio] = await pool.query('SELECT * FROM servicios WHERE id = ?', [id]);
            return servicio as any;
        } catch (error) {
            throw error;
        }
    }

    static async toggleActive(id: number) {
        try {
            await pool.query('UPDATE servicios SET activo = NOT activo WHERE id = ?', [id]);
            const [servicio] = await pool.query('SELECT * FROM servicios WHERE id = ?', [id]);
            return servicio as any;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id: number) {
        try {
            const [servicio] = await pool.query('SELECT * FROM servicios WHERE id = ?', [id]);
            await pool.query('DELETE FROM servicios WHERE id = ?', [id]);
            return servicio as any;
        } catch (error) {
            throw error;
        }
    }
}

export default ServicioModel;
