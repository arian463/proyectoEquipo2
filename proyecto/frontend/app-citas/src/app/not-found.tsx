export default function NotFound() {
  return (
    <div role="alert" aria-live="polite">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la ruta no existe.</p>
      <a href="/">Volver al inicio</a>
    </div>
  );
}