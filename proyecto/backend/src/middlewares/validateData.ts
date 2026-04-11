import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any>, source: 'body' | 'params' | 'query' = 'body') {
    return (request: Request, response: Response, next: NextFunction) => {
        try {
            let dataToValidate;
            switch (source) {
                case 'params':
                    dataToValidate = request.params;
                    break;
                case 'query':
                    dataToValidate = request.query;
                    break;
                default:
                    dataToValidate = request.body;
            }

            // Convertir params string a number si es necesario
            if (source === 'params') {
                const convertedData: any = {};
                for (const [key, value] of Object.entries(dataToValidate)) {
                    if (typeof value === 'string' && /^\d+$/.test(value)) {
                        convertedData[key] = parseInt(value, 10);
                    } else {
                        convertedData[key] = value;
                    }
                }
                dataToValidate = convertedData;
            }

            schema.parse(dataToValidate);
            next();
        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map((issue: any) => ({
                    message: `${issue.message}`,
                }))
                response.status(400).json({ error: "Datos inválidos", details: errorMessages });
            } else {
                response.status(500).json({ error: "Error interno del servidor" })
            }
        }
    };
}