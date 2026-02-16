"use client";
import Link from "next/link";

export default function ExplorarPage() {
    return (
        <main className="explorar-pantalla">
        <Link href="/" className="volver-btn">← Volver</Link>

        <div className="logo">Logo</div>
        <h1 className="titulo">Encuentra Lo Que Necesites</h1>

        <section className="tarjetas-negocio">
            {[1, 2, 3].map((item) => (
            <div key={item} className="negocio-card">
                <div className="imagen-negocio"></div>
                <h2 className="nombre-negocio">Nombre Del Negocio</h2>
                <p className="especialidad">especialidad</p>
                <Link href="/servicios" className="btn-primary">Ver Servicios</Link>
            </div>
            ))}
        </section>
        </main>
    );
}