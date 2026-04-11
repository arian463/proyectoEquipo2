import pool from "@config/db";

class EmpleadoModel {
    static async getAll() {
        try {
            const [empleados] = await pool.query('SELECT * FROM empleados ORDER BY created_at DESC');
            return empleados as any;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id: number) {
        try {
            const [empleado] = await pool.query('SELECT * FROM empleados WHERE id = ?', [id]);
            return empleado as any;
        } catch (error) {
            throw error;
        }
    }

    static async getActive() {
        try {
            const [empleados] = await pool.query('SELECT * FROM empleados WHERE estado = "activo" ORDER BY nombre ASC');
            return empleados as any;
        } catch (error) {
            throw error;
        }
    }

    static async create(nombre: string, apellido: string, email: string, telefono: string, cargo: string, foto_url?: string) {
        try {
            const [result]: any = await pool.query(
                'INSERT INTO empleados (nombre, apellido, email, telefono, cargo, foto_url) VALUES (?, ?, ?, ?, ?, ?)',
                [nombre, apellido, email, telefono, cargo, foto_url || null]
            );
            const empleadoId = result.insertId;
            const [empleado] = await pool.query('SELECT * FROM empleados WHERE id = ?', [empleadoId]);
            return empleado as any;
        } catch (error) {
            throw error;
        }
    }

    static async update(id: number, nombre: string, apellido: string, email: string, telefono: string, cargo: string, foto_url?: string) {
        try {
            await pool.query(
                'UPDATE empleados SET nombre = ?, apellido = ?, email = ?, telefono = ?, cargo = ?, foto_url = ? WHERE id = ?',
                [nombre, apellido, email, telefono, cargo, foto_url || null, id]
            );
            const [empleado] = await pool.query('SELECT * FROM empleados WHERE id = ?', [id]);
            return empleado as any;
        } catch (error) {
            throw error;
        }
    }

    static async toggleEstado(id: number) {
        try {
            await pool.query('UPDATE empleados SET estado = CASE WHEN estado = "activo" THEN "inactivo" ELSE "activo" END WHERE id = ?', [id]);
            const [empleado] = await pool.query('SELECT * FROM empleados WHERE id = ?', [id]);
            return empleado as any;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id: number) {
        try {
            const [empleado] = await pool.query('SELECT * FROM empleados WHERE id = ?', [id]);
            await pool.query('DELETE FROM empleados WHERE id = ?', [id]);
            return empleado as any;
        } catch (error) {
            throw error;
        }
    }
}

export default EmpleadoModel;
