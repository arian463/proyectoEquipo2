import { z } from 'zod';

// === NEGOCIO ===
export const negocioUpdateSchema = z.object({
    nombre: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre no puede exceder 100 caracteres').optional(),
    especialidad: z.string().min(1, 'La especialidad es requerida').max(100, 'La especialidad no puede exceder 100 caracteres').optional(),
    descripcion: z.string().max(500, 'La descripción no puede exceder 500 caracteres').optional(),
    direccion: z.string().min(1, 'La dirección es requerida').max(200, 'La dirección no puede exceder 200 caracteres').optional(),
    telefono: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Formato de teléfono inválido').max(20, 'El teléfono no puede exceder 20 caracteres').optional(),
    correo: z.string().email('Formato de correo inválido').max(100, 'El correo no puede exceder 100 caracteres').optional(),
    whatsapp_url: z.string().url('URL de WhatsApp inválida').optional().or(z.literal('')),
    facebook_url: z.string().url('URL de Facebook inválida').optional().or(z.literal('')),
    instagram_url: z.string().url('URL de Instagram inválida').optional().or(z.literal('')),
    logo_base64: z.string().refine((val) => {
        if (!val) return true;
        const base64Regex = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/;
        return base64Regex.test(val);
    }, 'El logo debe ser una imagen en formato base64 válida').optional(),
    hora_apertura: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)').optional(),
    hora_cierre: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)').optional(),
});

// === HORARIOS ===
export const horarioCreateSchema = z.object({
    dia_semana: z.number().int().min(0, 'El día debe ser entre 0-6').max(6, 'El día debe ser entre 0-6'),
    hora_inicio: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)'),
    hora_fin: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)'),
});

export const horarioUpdateSchema = z.object({
    dia_semana: z.number().int().min(0, 'El día debe ser entre 0-6').max(6, 'El día debe ser entre 0-6'),
    hora_inicio: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)'),
    hora_fin: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)'),
});

export const horarioIdSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID debe ser un número').transform(val => parseInt(val)),
});

// === FECHAS DESHABILITADAS ===
export const fechaDeshabilitadaCreateSchema = z.object({
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
    motivo: z.string().max(200, 'El motivo no puede exceder 200 caracteres').optional(),
});

export const fechaDeshabilitadaIdSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID debe ser un número').transform(val => parseInt(val)),
});