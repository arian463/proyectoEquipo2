import pool from "@config/db"

class AuthModel {
    static async getUserByEmail(email: string) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows as any;
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(id: number) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            return rows as any;
        } catch (error) {
            throw error;
        }
    }

    static async createAccount(nombre: string, email: string, password_hash: string, rol: string, telefono: string) {
        try {
            const [result]: any = await pool.query('INSERT INTO users (nombre, email, password_hash, rol, telefono) VALUES (?, ?, ?, ?, ?)', [nombre, email, password_hash, rol, telefono]);
            const userId = result.insertId;
            const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
            return rows as any;
        } catch (error) {
            throw error;
        }
    }

    static async updatePassword(id: number, password_hash: string) {
        try {
            await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [password_hash, id]);
            const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            return rows as any;
        } catch (error) {
            throw error;
        }
    }

}

export default AuthModel;
