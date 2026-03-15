"use client";
import Link from "next/link";
import { registerUser } from "@/features/auth/actions/auth-actions";
import type { ValidationDetail } from "@/features/auth/actions/auth-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const router = useRouter();
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationDetail[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setRole("owner");
    e.preventDefault();
    setLoading(true);
    setError("");
    setValidationErrors([]);
    setSuccess("");

    try {
      const result = await registerUser(full_name, email, password, role, phone);

      if (!result.ok) {
        setError(result.message);
        setValidationErrors(result.validation ?? []);
        return;
      }

      setSuccess("Usuario registrado exitosamente");
      router.push("/login");

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        const validation = (error as Error & { validation?: ValidationDetail[] }).validation ?? [];
        setValidationErrors(validation);
      } else {
        setError("Error al registrar usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="registro-container">
      <Link href="/">← Volver</Link>
      {/* <button className="volver-btn">← Volver</button> */}
      <div className="logo">Logo</div>
      <h1 className="titulo">Regístrate</h1>
      <p className="subtitulo">
        Comienza a organizar tu agenda y profesionaliza la atención a tus clientes.
      </p>

      <form className="registro-form" onSubmit={handleSubmit}>
        <label>
          Nombre Completo <span className="required">*</span>
          <input type="text" placeholder="juan perez" onChange={(e) => setFull_name(e.target.value)} />
        </label>

        <label>
          Correo Electrónico <span className="required">*</span>
          <input type="email" placeholder="juan@gmail.com" onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Contraseña <span className="required">*</span>
          <input type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
        </label>


        <label>
          Número telefónico <span className="required">*</span>
          <input type="tel" placeholder="+52XXXXXXXXXX" onChange={(e) => setPhone(e.target.value)} />
        </label>

        {(error || validationErrors.length > 0) && (
          <div
            role="alert"
            className="validation-alert mb-4 rounded border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {error && <p>{error}</p>}
            {validationErrors.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {validationErrors.map((detail, index) => (
                  <li key={`${detail.field}-${index}`}>
                    <strong className="capitalize">{detail.field.replace(/_/g, " ")}</strong>: {detail.message}
                    {detail.example && <span className="block text-xs font-normal text-red-700">{detail.example}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <p className="login-link">
          ¿Ya tienes cuenta? <a href="/login">Iniciar Sesión</a>
        </p>

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="crear-btn flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading && (
            <span
              className="
        motion-safe:animate-spin
        motion-reduce:animate-none
        inline-block
        w-4
        h-4
        border-2
        border-white
        border-t-transparent
        rounded-full
      "
              aria-hidden="true"
            />
          )}

          <span>
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </span>
        </button>
      </form>
    </main>
  );
}
