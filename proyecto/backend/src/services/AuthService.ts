import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import AuthModel from "@models/AuthModel";

import "dotenv/config"

class AuthService {

    static async register(nombre: string, email: string, password: string, rol: string) {
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        const id = randomUUID();

        try {
            await AuthModel.register(id, nombre, email, hashedPassword, rol);
        } catch (error) {
            throw new Error("Error al registrar el usuario");
        }

        return { id, nombre, email, rol };
    }

}

export default AuthService;