"use client";
import Link from "next/link";

export default function NegocioPage() {
    return (
        <main className="negocio-pantalla">
        <Link href="/client/servicios" className="volver-btn">← Volver</Link>

        <div className="logo">Logo</div>

        <section className="negocio-info">
            <div className="foto-negocio">Foto Negocio</div>
            <h1 className="titulo">Nombre Del Negocio</h1>
            <p className="ubicacion">Ubicación</p>
        </section>

        <section className="servicios-box">
            <h2 className="subtitulo">Servicios</h2>

            {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="servicio-card">
                <div className="foto-servicio">Foto</div>
                <div className="servicio-info">
                <h3 className="servicio-nombre">Nombre del servicio</h3>
                <p className="servicio-descripcion">Lorem ipsum</p>
                <p className="servicio-precio">Precio $$$</p>
                </div>
            </div>
            ))}
        </section>
        </main>
    );
}