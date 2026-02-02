import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import AuthModel from "@models/AuthModel";
import TokenBlacklistModel from "@models/TokenBlacklistModel";

import "dotenv/config"

class AuthService {

    static async login(email: string, password: string) {
        const user = await AuthModel.login(email);

        if (user.length === 0) {
            throw new Error("Credenciales inválidas");
        }

        const { id, full_name, role, password: passwordUser } = user[0];

        const isPasswordValid = await bcrypt.compare(password, passwordUser);

        if (!isPasswordValid) {
            throw new Error("Credenciales inválidas");
        }

        const timestamp = Date.now();

        const token = jwt.sign({ id, timestamp }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        return { token, id, full_name, email, role };
    }

    static async register(full_name: string, email: string, password: string, role: string) {
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        const id = randomUUID();

        try {
            await AuthModel.register(id, full_name, email, hashedPassword, role);
        } catch (error) {
            throw new Error("Error al registrar el usuario");
        }

        return { id, full_name, email, role };
    }

    static async logout(authorization: string) {
        try {
            const token = authorization.split(' ')[1];

            const decoded: any = jwt.decode(token);
            if (!decoded || !decoded.exp) {
                throw new Error("Token no válido");
            }

            const expiresAt = new Date(decoded.exp * 1000);

            await TokenBlacklistModel.addToBlacklist(token, expiresAt);

            return true;
        } catch (error) {
            console.error(error);
            throw new Error("Error al cerrar sesión");
        }
    }

}

export default AuthService;