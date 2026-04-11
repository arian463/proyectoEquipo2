import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const checkRole = (allowedRoles: string[]) => {
    return (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
        if (!request.user) {
            return response.status(401).json({ message: "Usuario no autenticado" });
        }

        if (!allowedRoles.includes(request.user.rol)) {
            return response.status(403).json({ message: "No tienes permisos para esta acción" });
        }

        next();
    };
};