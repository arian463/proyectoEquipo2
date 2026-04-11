import { z } from "zod";

const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
const horaRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

const numeroEnteroPositivo = z.preprocess((val) => {
    if (typeof val === "string" && val.trim().length > 0) {
        const parsed = parseInt(val, 10);
        return Number.isNaN(parsed) ? val : parsed;
    }
    return val;
}, z.number().int().positive());

const numeroDecimalPositivo = z.preprocess((val) => {
    if (typeof val === "string" && val.trim().length > 0) {
        const parsed = parseFloat(val);
        return Number.isNaN(parsed) ? val : parsed;
    }
    return val;
}, z.number().positive());

export const citaCreateSchema = z.object({
    cliente_id: numeroEnteroPositivo,
    servicio_id: numeroEnteroPositivo,
    empleado_id: numeroEnteroPositivo.optional(),
    fecha: z.string().regex(fechaRegex, "Fecha en formato YYYY-MM-DD"),
    hora_inicio: z.string().regex(horaRegex, "Hora en formato HH:MM"),
    notas: z.string().max(1000).optional(),
    precio: numeroDecimalPositivo.optional()
});

export const citaUpdateSchema = z.object({
    fecha: z.string().regex(fechaRegex, "Fecha en formato YYYY-MM-DD").optional(),
    hora_inicio: z.string().regex(horaRegex, "Hora en formato HH:MM").optional(),
    servicio_id: numeroEnteroPositivo.optional(),
    empleado_id: numeroEnteroPositivo.optional(),
    estado: z.enum(["pendiente", "confirmada", "completada", "cancelada"]).optional(),
    notas: z.string().max(1000).optional(),
    precio: numeroDecimalPositivo.optional()
});

export const citaIdSchema = z.object({
    id: z.number("ID inválido").int("ID debe ser entero").positive("ID debe ser positivo")
});

export const citaListSchema = z.object({
    cliente_id: numeroEnteroPositivo.optional(),
    servicio_id: numeroEnteroPositivo.optional(),
    fecha: z.string().regex(fechaRegex, "Fecha en formato YYYY-MM-DD").optional(),
    estado: z.enum(["pendiente", "confirmada", "completada", "cancelada"]).optional()
});
