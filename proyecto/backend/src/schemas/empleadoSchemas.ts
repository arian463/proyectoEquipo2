import { z } from "zod";

export const empleadoCreateSchema = z.object({
    nombre: z.string("Formato inválido").min(2, "El nombre debe tener mínimo 2 caracteres").max(100, "El nombre no puede exceder 100 caracteres").regex(/^[a-zA-ZÑñÁáÉéÍíÓóÚú\s]+$/, "El nombre debe contener solo letras y espacios"),
    apellido: z.string("Formato inválido").min(2, "El apellido debe tener mínimo 2 caracteres").max(100, "El apellido no puede exceder 100 caracteres").regex(/^[a-zA-ZÑñÁáÉéÍíÓóÚú\s]+$/, "El apellido debe contener solo letras y espacios"),
    email: z.string("Formato inválido").email("Correo electrónico inválido").max(150, "El email no puede exceder 150 caracteres"),
    telefono: z.string().min(10, "Número inválido (mínimo 10 dígitos)").max(30, "Número demasiado largo").regex(/^\+?[0-9\s\-\(\)]+$/, "El teléfono debe contener solo números, espacios, guiones y paréntesis"),
    cargo: z.string("Formato inválido").min(2, "El cargo debe tener mínimo 2 caracteres").max(100, "El cargo no puede exceder 100 caracteres"),
    fotoBase64: z.string().optional().refine((val) => {
        if (!val) return true;
        return val.startsWith('data:image/') && val.length < 3 * 1024 * 1024; // Max 3MB
    }, "Foto inválida o demasiado grande (máx 3MB)")
});

export const empleadoUpdateSchema = empleadoCreateSchema.partial().extend({
    id: z.number("ID inválido").int("ID debe ser entero").positive("ID debe ser positivo")
});

export const empleadoIdSchema = z.object({
    id: z.number("ID inválido").int("ID debe ser entero").positive("ID debe ser positivo")
});