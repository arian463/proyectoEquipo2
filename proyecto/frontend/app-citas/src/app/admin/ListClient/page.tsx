"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function ListaEmpleadoPage() {
        const router = useRouter();
    
    return (
        <main className="servicios-pantalla">
        <Link href="/admin/dashboard" className="volver-btn">← Volver</Link>

        <div className="logo">Logo</div>
        <h1 className="titulo">Lista de enpleado</h1>

        <Link href="/admin/NewClient" className="btn-primary">
            Agregar nuevo Empleado
        </Link>

        <section className="servicios-box">
            <h2 className="subtitulo">Empleados</h2>

            {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="servicio-card">

                <div className="servicio-info">
                <h3 className="servicio-nombre">Nombre del Empleado</h3>
                <p className="servicio-descripcion">lorem ipsum</p>
                </div>

                <div className="acciones-servicio">
                <button className="btn-editar" onClick={() => router.push('/admin/EditClient')}>✏️</button>
                <button className="btn-eliminar">🗑</button>
                </div>

            </div>
            ))}
        </section>
        </main>
    );
}