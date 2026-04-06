'use client';

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6"
    >
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-bold text-red-600 mb-4 tracking-tighter">500</h1>
        <h2 className="text-3xl font-bold text-black mb-4">Error interno</h2>
        <p className="text-[#3B3B3B] text-lg mb-8">
          Ha ocurrido un problema inesperado en el servidor.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-secondary text-white font-semibold text-[16px] px-8 h-[52px] rounded-lg shadow-md hover:bg-[#1f4ac0] hover:-translate-y-1 transition-all duration-300"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border-2 border-secondary text-secondary font-semibold text-[16px] px-8 h-[52px] rounded-lg hover:bg-[#eaf0fd] hover:-translate-y-1 transition-all duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}