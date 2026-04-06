import Link from "next/link";

export default function NotFound() {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6"
    >
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-black mb-4 tracking-tighter">404</h1>
        <h2 className="text-3xl font-bold text-black mb-4">Página no encontrada</h2>
        <p className="text-[#3B3B3B] text-lg mb-8">
          Lo sentimos, la ruta que buscas no existe.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-secondary text-white font-semibold text-[16px] px-8 h-[52px] rounded-lg shadow-md hover:bg-[#1f4ac0] hover:-translate-y-1 transition-all duration-300"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}