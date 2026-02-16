"use client";
import Link from "next/link";

export default function CitasPage() {
    return (
        <main className="citas-pantalla">
        <Link href="/" className="volver-btn">← Volver</Link>

        <div className="logo">Logo</div>
        <h1 className="titulo">Mis Citas</h1>

        <section className="citas-header">
            <h2 className="subtitulo">Proximas Citas</h2>
            <Link href="/client/servicios" className="btn-primary">Agendar nueva cita</Link>
        </section>

        <section className="citas-lista">
            {[1, 2].map((item) => (
            <div key={item} className="cita-card">
                <div className="cita-fecha">
                <span className="dia">15</span>
                <span className="mes">FEB</span>
                </div>
                <div className="cita-detalles">
                <h3 className="servicio-nombre">Nombre Del Servicio</h3>
                <p className="negocio">Nombre del negocio</p>
                <p className="direccion">Direccion del negocio</p>
                </div>
                <span className="estado-confirmada">Confirmada</span>
            </div>
            ))}
        </section>
        </main>
    );
}