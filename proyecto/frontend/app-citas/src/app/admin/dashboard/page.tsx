"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { signOutBackend } from "@/features/auth/actions/auth-actions";

export default function DashboardPage() {
    const { data: session } = useSession();

    const handleSignOut = () => {
        const token = session?.user.accessToken;
        if (token) {
            try { signOutBackend(token); } catch (error) { console.log(error); }
        }
        signOut({ callbackUrl: "/login" });
    };

    return (
        <main className="dashboard-pantalla">
            {/* Barra lateral */}
            <aside className="sidebar">
                <Link href="/" className="sidebar-link">Inicio</Link>
                <Link href="/admin/ListCitas" className="sidebar-link">Mis Citas</Link>
                <Link href="/admin/service" className="sidebar-link">Servicios</Link>
                <Link href="/admin/ListClient" className="sidebar-link">Empleados</Link>
            </aside>

            {/* Contenido principal */}
            <section className="dashboard-contenido">
                <header className="dashboard-header">
                    <h1 className="titulo">¡Bienvenido de vuelta!</h1>
                    <button className="btn-cerrar" onClick={handleSignOut}>Cerrar sesión</button>
                </header>

                {/* Resumen */}
                <div className="resumen-grid">
                    <div className="resumen-card">12 Citas este mes</div>
                    <div className="resumen-card">45 Citas completadas</div>
                    <div className="resumen-card">3 Próximas citas</div>
                </div>

                {/* Próximas citas */}
                <div className="proximas-citas">
                    <h2 className="subtitulo">Próximas citas</h2>
                    <ul className="lista-citas">
                        <li>Cita 1: 12:00</li>
                        <li>Cita 2: 14:00</li>
                        <li>Cita 3: 15:00</li>
                        <li>Cita 4: 16:00</li>
                        <li>Cita 5: 17:00</li>
                        <li>Cita 6: 18:00</li>
                    </ul>
                </div>

            </section>
        </main>
    );
}