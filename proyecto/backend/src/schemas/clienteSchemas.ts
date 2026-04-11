import { z } from 'zod';

// === CLIENTES ===
export const clienteCreateSchema = z.object({
    nombre: z.string().min(1, 'El nombre es requerido').max(50, 'El nombre no puede exceder 50 caracteres'),
    apellido: z.string().min(1, 'El apellido es requerido').max(50, 'El apellido no puede exceder 50 caracteres'),
    correo: z.string().email('Formato de correo inválido').max(100, 'El correo no puede exceder 100 caracteres'),
    telefono: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Formato de teléfono inválido').max(20, 'El teléfono no puede exceder 20 caracteres').optional(),
    fecha_nacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)').optional(),
    notas: z.string().max(500, 'Las notas no pueden exceder 500 caracteres').optional(),
});

export const clienteUpdateSchema = z.object({
    nombre: z.string().min(1, 'El nombre es requerido').max(50, 'El nombre no puede exceder 50 caracteres').optional(),
    apellido: z.string().min(1, 'El apellido es requerido').max(50, 'El apellido no puede exceder 50 caracteres').optional(),
    correo: z.string().email('Formato de correo inválido').max(100, 'El correo no puede exceder 100 caracteres').optional(),
    telefono: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Formato de teléfono inválido').max(20, 'El teléfono no puede exceder 20 caracteres').optional().or(z.literal('')),
    fecha_nacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)').optional().or(z.literal('')),
    notas: z.string().max(500, 'Las notas no pueden exceder 500 caracteres').optional().or(z.literal('')),
});

export const clienteIdSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID debe ser un número').transform(val => parseInt(val)),
});

export const clienteSearchSchema = z.object({
    q: z.string().min(2, 'La búsqueda debe tener al menos 2 caracteres').max(100, 'La búsqueda no puede exceder 100 caracteres'),
});