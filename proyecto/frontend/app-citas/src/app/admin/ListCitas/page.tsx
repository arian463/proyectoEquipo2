"use client";
import Link from "next/link";

export default function ListaCitasPage() {
    return (
        <main className="citas-pantalla">
        <Link href="/admin/dashboard" className="volver-btn">← Volver</Link>

        <div className="logo">Logo</div>
        <h1 className="titulo">Lista de citas</h1>

        <section className="citas-box">
            <h2 className="subtitulo">Citas</h2>

            {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="cita-card">
                <h3 className="cita-nombre">Cita {item}</h3>
                <p className="cita-detalles">
                🕒 12:00 &nbsp; 📍 Lorem ipsum dolor sit amet
                </p>
            </div>
            ))}
        </section>
        </main>
    );
}