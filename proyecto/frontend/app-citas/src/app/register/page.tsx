import Link from "next/link";
export default function RegistroPage() {
  return (
    <main className="registro-container">
      <Link href="/">← Volver</Link>
      {/* <button className="volver-btn">← Volver</button> */}
      <div className="logo">Logo</div>
      <h1 className="titulo">Regístrate</h1>
      <p className="subtitulo">
        Comienza a organizar tu agenda y profesionaliza la atención a tus clientes.
      </p>

      <form className="registro-form">
        <label>
          Nombre Completo <span className="required">*</span>
          <input type="text" placeholder="juan perez" />
        </label>

        <label>
          Correo Electrónico <span className="required">*</span>
          <input type="email" placeholder="juon@gmail.com" />
        </label>

        <label>
          Contraseña <span className="required">*</span>
          <input type="password" placeholder="********" />
        </label>

        <label>
          Número telefónico <span className="required">*</span>
          <input type="tel" placeholder="+52XXXXXXXXXX" />
        </label>

        <p className="login-link">
          ¿Ya tienes cuenta? <a href="/login">Iniciar Sesión</a>
        </p>

        <button type="submit" className="crear-btn">Crear Cuenta</button>
      </form>
    </main>
  );
}