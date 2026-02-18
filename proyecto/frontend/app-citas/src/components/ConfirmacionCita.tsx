"use client";
import Link from "next/link";

export default function ConfirmacionCita({ onClose }: { onClose: () => void }) {
    return (
        <div className="overlay">
        <div className="modal">
            <div className="logo">Logo</div>

            <div className="icono-check">✔</div>

            <h1 className="titulo">
            Su cita quedó agendada correctamente
            </h1>

            <p className="body-text">
            Le enviaremos un recordatorio a su correo 1 hora antes.
            </p>
            <p className="body-text">
            Recuerde ser puntual, no llegar a la cita podría afectar su reputación.
            </p>

            <div className="acciones">
            <button className="btn-cancelar">Cancelar Cita</button>
            <Link href="/" className="volver-btn">← Volver</Link>
            </div>
        </div>
        </div>
    );
}

// ESTE CODIGO ES PARA USARSE COMO PANTALLA EMERGENTE