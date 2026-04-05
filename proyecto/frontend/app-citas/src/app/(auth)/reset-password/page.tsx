"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { userResetPasswordSchema, type ResetPasswordInput, forgotPassword } from "@/features/auth";

export default function ResetPasswordPage() {
    const emailRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [fieldError, setFieldError] = useState<Partial<Record<keyof ResetPasswordInput, string>>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setFieldError({});

        const resultValidation = userResetPasswordSchema.safeParse({ email });

        if (!resultValidation.success) {
            const formattedErrors: Partial<Record<keyof ResetPasswordInput, string>> = {};
            resultValidation.error.issues.forEach((err) => {
                const path = err.path[0] as keyof ResetPasswordInput;
                if (!formattedErrors[path]) {
                    formattedErrors[path] = err.message;
                }
            });

            setFieldError(formattedErrors);
            return;
        }

        setLoading(true);

        try {
            await forgotPassword(email);
            setSuccess("Si el correo está registrado, recibirás un enlace de recuperación pronto.");
            setEmail("");
        } catch (err) {
            setError("Ocurrió un error al intentar enviar el correo. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-container">
            <Link href="/login" className="back-link">
                ← Volver al inicio de sesión
            </Link>

            <div className="flex flex-col items-center gap-2 mt-6">
                <h1 className="titulo">Recuperar Contraseña</h1>
                <p className="subtitulo">Ingresa tu correo para recibir un enlace de recuperación.</p>
            </div>


            <div aria-live="polite" className="mb-6 space-y-3">
                {error && (
                    <div role="alert" className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                        <span className="shrink-0 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">!</span>
                        <p>{error}</p>
                    </div>
                )}
                {success && (
                    <div role="status" className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                        <span className="shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">✓</span>
                        <p>{success}</p>
                    </div>
                )}
            </div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
                <label htmlFor="email">
                    Correo Electrónico <span className="required">*</span>
                </label>
                <input
                    id="email"
                    type="email"
                    ref={emailRef}
                    placeholder="tuemail@gmail.com"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldError.email ? "border-red-500 ring-1 ring-red-500" : ""}
                />
                {fieldError.email && (
                    <p className="text-red-600 text-xs mt-1 font-medium">{fieldError.email}</p>
                )}

                <button
                    type="submit"
                    className="entrar-btn mt-6"
                    disabled={loading}
                    aria-busy={loading}
                >
                    {loading ? "Enviando..." : "Enviar enlace"}
                </button>
            </form>
        </main>
    );
}