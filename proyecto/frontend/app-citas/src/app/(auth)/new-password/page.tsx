"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef, Suspense } from "react";
import { newPasswordSchema, type NewPasswordInput, resetPassword } from "@/features/auth";

function NewPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof NewPasswordInput, string>>>({});

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");
    setFieldErrors({});

    if (!id || !token) {
      setServerError("Enlace inválido o expirado. Faltan parámetros en la URL.");
      return;
    }

    const resultValidation = newPasswordSchema.safeParse({ password, confirmPassword });

    if (!resultValidation.success) {
      const formattedErrors: Partial<Record<keyof NewPasswordInput, string>> = {};
      resultValidation.error.issues.forEach((err) => {
        const path = err.path[0] as keyof NewPasswordInput;
        if (!formattedErrors[path]) {
          formattedErrors[path] = err.message;
        }
      });

      setFieldErrors(formattedErrors);
      return;
    }

    setLoading(true);

    try {
      await resetPassword(id, token, resultValidation.data.password);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setServerError(err.message || "Error inesperado. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-xl border border-green-200 text-green-800 text-center animate-in fade-in zoom-in duration-300">
        <span className="text-5xl mb-4" aria-hidden="true">✓</span>
        <h2 className="text-2xl font-bold mb-2">¡Contraseña Actualizada!</h2>
        <p className="text-green-700">Tu contraseña ha sido restablecida correctamente.</p>
        <p className="text-green-600 text-sm mt-4">Redirigiendo al inicio de sesión...</p>
      </div>
    );
  }

  return (
    <>
      <Link href="/login" className="back-link">
        ← Volver al login
      </Link>

      <div className="logo" aria-hidden="true">Logo</div>
      <h1 className="titulo">Nueva Contraseña</h1>
      <p className="subtitulo">Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta.</p>

      <div aria-live="polite" className="mb-6">
        {serverError && (
          <div role="alert" className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
            <span className="shrink-0 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">!</span>
            <p>{serverError}</p>
          </div>
        )}
      </div>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        {(!id || !token) && (
          <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-lg text-sm">
            No se encontró el ID o Token en la URL. Asegúrate de usar el enlace completo enviado a tu correo.
          </div>
        )}

        <label htmlFor="password">
          Nueva Contraseña <span className="required">*</span>
        </label>
        <input
          id="password"
          type="password"
          ref={passwordRef}
          placeholder="Ej: NuevaClave123!"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className={fieldErrors.password ? "border-red-500 ring-1 ring-red-500" : ""}
        />
        {fieldErrors.password && (
          <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.password}</p>
        )}

        <label htmlFor="confirmPassword" className="mt-4 block">
          Confirmar Contraseña <span className="required">*</span>
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Ej: NuevaClave123!"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={fieldErrors.confirmPassword ? "border-red-500 ring-1 ring-red-500" : ""}
        />
        {fieldErrors.confirmPassword && (
          <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.confirmPassword}</p>
        )}

        <button
          type="submit"
          className="entrar-btn mt-8"
          disabled={loading || !id || !token}
          aria-busy={loading}
        >
          {loading ? "Guardando..." : "Restablecer Contraseña"}
        </button>
      </form>
    </>
  );
}

export default function NewPasswordPage() {
  return (
    <main className="login-container">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 animate-pulse">Cargando...</p>
        </div>
      }>
        <NewPasswordForm />
      </Suspense>
    </main>
  );
}