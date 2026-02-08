"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="login-container">
      <Link href="/">← Volver</Link>

      <div className="logo">Logo</div>
      <h1 className="titulo">Iniciar Sesión</h1>
      <p className="subtitulo">
        Accede a tu cuenta para organizar tu agenda y atender mejor a tus clientes.
      </p>

      <form className="login-form">
        <label>
          Correo Electrónico <span className="required">*</span>
          <input type="email" placeholder="tuemail@gmail.com" />
        </label>

        <label>
          Contraseña <span className="required">*</span>
          <input type="password" placeholder="********" />
        </label>

        <p className="registro-link">
          ¿No tienes cuenta? <a href="/registro">Regístrate</a>
        </p>

        <button type="submit" className="entrar-btn">Entrar</button>
      </form>
    </main>
  );
}