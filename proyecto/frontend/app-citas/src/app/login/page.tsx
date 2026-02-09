"use client";

import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

export default function LoginPage() {

  // ----------------------------------------------------------------enlace con BACKEND
  
  // const router = useRouter();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const res = await fetch("http://localhost:3001/login", { 
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setError(data.message || "Error al iniciar sesión");
  //       return;
  //     }

  //     localStorage.setItem("token", data.data.token);

  //     router.push("/dashboard");
  //   } catch (err) {
  //     setError("Error de conexión con el servidor");
  //   }
  // };





// ---------------------------------------------------frontend
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
          <input type="email" placeholder="tuemail@gmail.com" autoFocus/>
        </label>

        <label>
          Contraseña <span className="required">*</span>
          <input type="password" placeholder="********" />
        </label>

        <p className="registro-link">
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>

        <button type="submit" className="entrar-btn">Entrar</button>
      </form>
    </main>
  );
}