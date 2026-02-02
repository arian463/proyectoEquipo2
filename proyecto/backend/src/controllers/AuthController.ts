import AuthService from "@services/AuthService";
import { Request, Response } from "express";

class AuthController {

    static async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            const result = await AuthService.login(email, password);

            if (!result) {
                response.status(401).json({ message: "Crendenciales inválidas" });
                return;
            }

            response.status(200).json({ message: "Login exitoso", data: result })
        } catch (error) {
            response.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    static async register(request: Request, response: Response) {
        try {
            const { full_name, email, password, role } = request.body;

            const result = await AuthService.register(full_name, email, password, role);

            if (!result) {
                response.status(401).json({ message: "Crendenciales inválidas" });
                return;
            }

            response.status(200).json({ message: "Registro exitoso", data: result })
        } catch (error) {
            response.status(500).json({ message: "Error interno del servidor", error });
        }
    }
}

export default AuthController;