import connection from "@config/config"

class AuthModel {
    
    static async register(id: string, nombre: string, email: string, password: string, rol: string) {
        try {
            await connection.query('INSERT INTO usuarios (id, nombre, email, password, rol) VALUES (?, ?, ?, ?, ?)', [id, nombre, email, password, rol]);
            const [rows] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            return rows as any;
        } catch (error) {
            throw error;
        }
    }

}

export default AuthModel;