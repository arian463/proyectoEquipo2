"use client";
import Link from "next/link";

export default function ServiciosPage() {
    return (
        <main className="servicios-full">
        <header className="servicios-header">
            <Link href="/" className="volver-btn">← Volver</Link>
            <div className="logo">Logo</div>
            <h1 className="titulo-principal">Seleccione Su Servicio</h1>
            <p className="subtitulo">
            Seleccione el servicio que requiera para agendar cita
            </p>
        </header>

        <section className="servicios-grid">
            <button className="servicio-btn">Servicio 1</button>
            <button className="servicio-btn">Servicio 2</button>
            <button className="servicio-btn">Servicio 3</button>
            <button className="servicio-btn">Servicio 4</button>
            <button className="servicio-btn">Servicio 5</button>
            <button className="servicio-btn agregar-btn">
            <span className="icono-mas">+</span> Agregar Servicio
            </button>
        </section>
        </main>
    );
}