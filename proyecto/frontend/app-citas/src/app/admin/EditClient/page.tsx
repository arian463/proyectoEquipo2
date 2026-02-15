"use client";
import Link from "next/link";

export default function EditClient() {

    return (
        <div className="servicios-pantalla">

        <Link href="/admin/service" className="volver-btn">
            ← Volver
        </Link>

        <div className="registro-container">
            <h1 className="titulo">Editar empleado</h1>
            <p className="subtitulo">Completa los campos obligatorios</p>

            <form className="registro-form">

            <label htmlFor="servicio">
                Empleado <span className="required">*</span>
                <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Juan"
                />
            </label>

            <label htmlFor="coste">
                Apellido <span className="required">*</span>
                <input type="text" id="apellido" name="apellido" placeholder="Lopez" />
            </label>

            <label htmlFor="coste">
                Edad <span className="required">*</span>
                <input type="text" id="edad" name="edad" placeholder="20" />
            </label>

            <button type="submit" className="crear-btn">
                Realizar cambios
            </button>
            </form>
        </div>
        </div>
    );
}