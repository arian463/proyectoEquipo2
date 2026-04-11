import { z } from "zod";

const nombreValidator = z
    .string("Formato inválido")
    .min(3, "El nombre debe tener mínimo 3 caracteres")
    .regex(/^[a-zA-ZÑñÁáÉéÍíÓóÚú ]+$/, "El nombre debe contener solo letras");

const telefonoValidator = z
    .string()
    .min(10, "Número inválido (mínimo 10 dígitos)")
    .regex(/^\+?[0-9]+$/, "El número debe contener solo dígitos")
    .optional();

export const userRegisterSchema = z
    .object({
        nombre: nombreValidator.optional(),
        full_name: nombreValidator.optional(),
        email: z.email("Correo de formato inválido"),
        password: z
            .string("Formato inválido")
            .min(8, "La contraseña debe tener mínimo 8 caracteres")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"
            ),
        telefono: telefonoValidator
    })
    .superRefine((data, ctx) => {
        if (!data.nombre && !data.full_name) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Debe proporcionar nombre o full_name",
                path: ["full_name"]
            });
        }
    });

export const userLoginSchema = z.object({
    email: z.email("Correo de formato inválido"),
    password: z.string("Formato inválido").min(8, "La contraseña debe tener minimo 8 carácteres").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"),
})

export const userResetPasswordSchema = z.object({
    email: z.email("Correo de formato inválido"),
});

export const userNewPasswordSchema = z.object({
    id: z.uuid("ID inválido"),
    token: z.jwt("Token inválido"),
    newPassword: z.string().min(8, "La contraseña debe tener minimo 8 carácteres").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"),
});


