'use client';

import { useEffect } from "react";

export default function Error(props: { error: Error; reset: () => void }) {
  const { error, reset } = props;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" aria-live="assertive">
      <h1>500 - Error interno</h1>
      <p>Ha ocurrido un problema en el servidor.</p>
      <button onClick={reset}>Intentar de nuevo</button>
      <a href="/">Volver al inicio</a>
    </div>
  );
}