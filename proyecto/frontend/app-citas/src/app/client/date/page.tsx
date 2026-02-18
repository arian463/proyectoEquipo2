"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

import Link from "next/link";

export default function AgendarPage() {
    const [fecha, setFecha] = useState(new Date());

    return (
        <main className="agendar-pantalla">
        <Link href="/" className="volver-btn">← Volver</Link>

        <div className="logo">Logo</div>

        <section className="negocio-info">
            <div className="foto-negocio">Foto Negocio</div>
            <h1 className="titulo">Nombre Del Negocio</h1>
            <p className="ubicacion">Ubicación</p>
        </section>

        <section className="resumen-box">
        <div className="calendario-box">
            <h2 className="subtitulo">Seleccione el día</h2>
            <Calendar
                onChange={setFecha}
                value={fecha}
                locale="es-ES"
                tileClassName={() => "dia-gris"}
            />
            <p className="body-text">Día seleccionado: {fecha.toLocaleDateString()}</p>
        </div>
        </section>

        <section className="resumen-box">
            <h2 className="subtitulo">Resumen</h2>
            <p className="body-text">Lorem Ipsum Dolor Sit Amet, Consectetur</p>
            <p className="body-text">$$$</p>
            <p className="total">Total A Pagar: $$$</p>
            <button className="btn-primary">Realizar cita</button>
        </section>
        </main>
    );
}