"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {

  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (!result) {
      setError("Credenciales inválidas");
      setLoading(false);
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

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Correo Electrónico <span className="required">*</span>
          <input type="email" placeholder="tuemail@gmail.com" name="email" onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Contraseña <span className="required">*</span>
          <input type="password" placeholder="********" name="password" onChange={(e) => setPassword(e.target.value)} />
        </label>

        <p className="registro-link">
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>

        <button type="submit" className="entrar-btn" disabled={loading}>Entrar</button>
      </form>
    </main>
  );
}