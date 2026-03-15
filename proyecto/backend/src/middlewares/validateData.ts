import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodIssue } from "zod";

type ValidationDetail = {
    field: string;
    message: string;
    example?: string;
};

const EXAMPLE_BY_FIELD: Record<string, string> = {
    full_name: "Ejemplo: Ana María",
    email: "Ejemplo: usuario@dominio.com",
    password: "Ejemplo: Abcd123$",
};

function buildFieldName(path: (string | number)[]): string {
    if (!path.length) {
        return "general";
    }
    return path.map((segment) => segment.toString()).join(".");
}

function findExample(path: (string | number)[]): string | undefined {
    const normalized = path.map((segment) => segment.toString().toLowerCase());
    const candidate = normalized.find((segment) => EXAMPLE_BY_FIELD[segment]);
    return candidate ? EXAMPLE_BY_FIELD[candidate] : undefined;
}

function formatValidationIssue(issue: ZodIssue): ValidationDetail {
    const field = buildFieldName(issue.path);
    const example = findExample(issue.path);
    const message = example ? `${issue.message}. ${example}` : issue.message || "Formato inválido";

    return {
        field,
        message,
        example,
    };
}

export function validateData(schema: z.ZodTypeAny) {
    return (request: Request, response: Response, next: NextFunction) => {
        try {
            schema.parse(request.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const validation = error.issues.map(formatValidationIssue);
                console.warn("Validation failed:", validation);

                response.status(400).json({
                    status: "validation_error",
                    message: "Por favor corrige los campos marcados y vuelve a intentarlo.",
                    validation,
                });
                return;
            }

            next(error);
        }
    };
}
