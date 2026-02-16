"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function ListaServiciosPage() {
        const router = useRouter();
    
    return (
        <main className="servicios-pantalla">
        <Link href="/admin/dashboard" className="volver-btn">← Volver</Link>

        <div className="logo">Logo</div>
        <h1 className="titulo">Lista de servicios</h1>

        <Link href="/admin/NuevoServicio" className="btn-primary">
            Agregar nuevo servicio
        </Link>

        <section className="servicios-box">
            <h2 className="subtitulo">Servicios</h2>

            {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="servicio-card">
                <div className="foto-placeholder">Foto</div>
                <div className="servicio-info">
                <h3 className="servicio-nombre">Nombre del servicio</h3>
                <p className="servicio-descripcion">lorem ipsum</p>
                <p className="servicio-precio">Precio $$$</p>
                </div>
                <div className="acciones-servicio">
                <button className="btn-editar" onClick={() => router.push('/admin/EditService')}>✏️</button>
                <button className="btn-eliminar">🗑</button>
                </div>
            </div>
            ))}
        </section>
        </main>
    );
}