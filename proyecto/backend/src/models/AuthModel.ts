import connection from "@config/config"

class AuthModel {
    static async login(email: string) {
        try {
            const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows as any;
        } catch (error) {
            throw error;
        }
    }

    static async register(id: string, full_name: string, email: string, password: string, role: string) {
        try {
            await connection.query('INSERT INTO users (id, full_name, email, password, role) VALUES (?, ?, ?, ?, ?)', [id, full_name, email, password, role]);
            const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
            return rows as any;
        } catch (error) {
            throw error;
        }
    }

}

export default AuthModel;