import pool from "@config/db";

class ClienteModel {
    static async getAll() {
        try {
            const [clientes] = await pool.query('SELECT * FROM clientes ORDER BY nombre ASC');
            return clientes as any;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id: number) {
        try {
            const [clientes] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
            return (clientes as any[])[0] as any;
        } catch (error) {
            throw error;
        }
    }

    static async getByEmail(correo: string) {
        try {
            const [clientes] = await pool.query('SELECT * FROM clientes WHERE correo = ?', [correo]);
            return (clientes as any[])[0] as any;
        } catch (error) {
            throw error;
        }
    }

    static async create(datos: {
        nombre: string;
        apellido: string;
        correo: string;
        telefono?: string;
        fecha_nacimiento?: string;
        notas?: string;
    }) {
        try {
            const [result] = await pool.query(
                'INSERT INTO clientes (nombre, apellido, correo, telefono, fecha_nacimiento, notas) VALUES (?, ?, ?, ?, ?, ?)',
                [datos.nombre, datos.apellido, datos.correo, datos.telefono || null, datos.fecha_nacimiento || null, datos.notas || null]
            );
            const clienteId = (result as any).insertId;
            const [cliente] = await pool.query('SELECT * FROM clientes WHERE id = ?', [clienteId]);
            return (cliente as any[])[0] as any;
        } catch (error) {
            throw error;
        }
    }

    static async update(id: number, datos: {
        nombre?: string;
        apellido?: string;
        correo?: string;
        telefono?: string;
        fecha_nacimiento?: string;
        notas?: string;
    }) {
        try {
            const campos = Object.keys(datos);
            const valores = Object.values(datos);

            if (campos.length === 0) {
                throw new Error('No hay campos para actualizar');
            }

            const setClause = campos.map(campo => `${campo} = ?`).join(', ');
            const query = `UPDATE clientes SET ${setClause} WHERE id = ?`;

            await pool.query(query, [...valores, id]);
            const [cliente] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
            return (cliente as any[])[0] as any;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id: number) {
        try {
            const [cliente] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
            await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
            return (cliente as any[])[0] as any;
        } catch (error) {
            throw error;
        }
    }

    // Buscar clientes por nombre o correo
    static async search(query: string) {
        try {
            const searchTerm = `%${query}%`;
            const [clientes] = await pool.query(
                'SELECT * FROM clientes WHERE nombre LIKE ? OR apellido LIKE ? OR correo LIKE ? ORDER BY nombre ASC',
                [searchTerm, searchTerm, searchTerm]
            );
            return clientes as any;
        } catch (error) {
            throw error;
        }
    }
}

export default ClienteModel;