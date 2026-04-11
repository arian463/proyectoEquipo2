import { z } from "zod";

export const servicioCreateSchema = z.object({
    nombre: z.string("Formato inválido").min(3, "El nombre debe tener mínimo 3 caracteres").max(120, "El nombre no puede exceder 120 caracteres"),
    descripcion: z.string("Formato inválido").min(10, "La descripción debe tener mínimo 10 caracteres").max(1000, "La descripción no puede exceder 1000 caracteres"),
    precio: z.number("El precio debe ser un número").positive("El precio debe ser mayor a 0").max(99999.99, "Precio demasiado alto"),
    duracion_minutos: z.number("La duración debe ser un número").int("La duración debe ser un número entero").min(15, "Mínimo 15 minutos").max(480, "Máximo 8 horas"),
    imagenBase64: z.string().optional().refine((val) => {
        if (!val) return true;
        return val.startsWith('data:image/') && val.length < 5 * 1024 * 1024; // Max 5MB
    }, "Imagen inválida o demasiado grande (máx 5MB)")
});

export const servicioUpdateSchema = servicioCreateSchema.partial().extend({
    id: z.number("ID inválido").int("ID debe ser entero").positive("ID debe ser positivo")
});

export const servicioIdSchema = z.object({
    id: z.number("ID inválido").int("ID debe ser entero").positive("ID debe ser positivo")
});