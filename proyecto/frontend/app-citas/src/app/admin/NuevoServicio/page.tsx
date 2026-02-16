"use client";
import Link from "next/link";

export default function NuevoServicio() {
    return (
        <div className="servicios-pantalla">
        {/* Botón volver */}
        <Link href="/admin/service" className="volver-btn">
            ← Volver
        </Link>

        {/* Contenedor principal */}
        <div className="registro-container">
            <h1 className="titulo">Añadir nuevo servicio</h1>
            <p className="subtitulo">Completa los campos obligatorios</p>

            <form className="registro-form">
            {/* Campo Servicio */}
            <label htmlFor="servicio">
                Servicio <span className="required">*</span>
                <input
                type="text"
                id="servicio"
                name="servicio"
                placeholder="Peinado"
                />
            </label>

            {/* Campo Coste */}
            <label htmlFor="coste">
                Coste <span className="required">*</span>
                <input type="text" id="coste" name="coste" placeholder="$320" />
            </label>

            {/* Campo Descripción */}
            <label htmlFor="descripcion">
                Descripción <span className="required">*</span>
                <textarea
                id="descripcion"
                name="descripcion"
                rows={4}
                placeholder="Descripción sobre el servicio"
                ></textarea>
            </label>

            {/* Campo Imagen */}
            <label htmlFor="imagen">
                Imagen
                <input type="file" id="imagen" name="imagen" />
            </label>

            {/* Botón Crear */}
            <button type="submit" className="crear-btn">
                Crear servicio
            </button>
            </form>
        </div>
        </div>
    );
}