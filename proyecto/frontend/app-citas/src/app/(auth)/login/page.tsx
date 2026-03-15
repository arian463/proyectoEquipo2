"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (submitted && Object.keys(errors).length > 0) {
      if (errors.email) {
        emailRef.current?.focus();
      } else if (errors.password) {
        passwordRef.current?.focus();
      }
    }
  }, [errors, submitted]);

  useEffect(() => {
    if (error) {
      errorRef.current?.focus();
    }
  }, [error]);

  useEffect(() => {
    if (searchParams.get("unauthorized")) {
      setError(
        "No tienes permisos para acceder. Inicia sesión con una cuenta autorizada."
      );
    }
  }, [searchParams]);

  const validate = () => {
    const validationErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      validationErrors.email = "El correo es obligatorio.";
    } else if (!emailRegex.test(email.trim())) {
      validationErrors.email = "Ingresa un correo electrónico válido.";
    }

    if (!password) {
      validationErrors.password = "La contraseña es obligatoria.";
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitted(true);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    const result = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
    });

    setLoading(false);

    if (!result || result.error) {
      setError(
        "No hemos podido iniciar sesión. Verifica tu correo y contraseña e inténtalo de nuevo."
      );
      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <main className="login-container">
      <Link href="/">← Volver</Link>

      <div className="logo">Logo</div>
      <h1 className="titulo">Iniciar Sesión</h1>
      <p className="subtitulo">
        Accede a tu cuenta para organizar tu agenda y atender mejor a tus clientes.
      </p>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className={`form-error ${error ? "visible" : "hidden"}`}
        >
          {error}
        </div>

        <label htmlFor="email">
          Correo Electrónico <span className="required">*</span>
        </label>
        <input
          id="email"
          ref={emailRef}
          type="email"
          autoComplete="email"
          placeholder="tuemail@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            if (submitted) {
              setErrors(validate());
            }
          }}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
        />
        {errors.email ? (
          <p id="email-error" className="field-error" role="alert">
            {errors.email}
          </p>
        ) : null}

        <label htmlFor="password">
          Contraseña <span className="required">*</span>
        </label>
        <input
          id="password"
          ref={passwordRef}
          type="password"
          autoComplete="current-password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => {
            if (submitted) {
              setErrors(validate());
            }
          }}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
          required
        />
        {errors.password ? (
          <p id="password-error" className="field-error" role="alert">
            {errors.password}
          </p>
        ) : null}

        <p className="registro-link">
          ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
        </p>

        <button
          type="submit"
          className="entrar-btn"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Iniciando sesión…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}