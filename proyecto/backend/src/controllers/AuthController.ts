import AuthService from "@services/AuthService";
import { Request, Response } from "express";

class AuthController {

    static async register(request: Request, response: Response) {
        try {
            const { nombre, email, password, rol } = request.body;

            const result = await AuthService.register(nombre, email, password, rol);

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