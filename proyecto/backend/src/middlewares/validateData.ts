import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateData (schema: z.ZodObject<any, any>) {
    return (request: Request, response: Response, next: NextFunction) => {
        try {
            schema.parse(request.body);
            next();
        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map((issue: any) => ({
                    message: `${issue.message}`,
                }))
                response.status(400).json({ error: "Datos invalidos", details: errorMessages });
            } else {
                response.status(500).json({ error: "Error interno del servidor" })
            }
        }
    };
}