"use server"
export async function registerUser(full_name: string, email: string, password: string, role: string, phone: string) {

    const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, email, password, role, phone }),
    });

    const statusCode = res.status;

    const data = await res.json();

    if (!res.ok && data?.details?.length > 0) {
        throw new Error(data?.details[0].message || "Error al registrar usuario");
    } else if (!res.ok) {
        throw new Error(data.message || "Error al registrar usuario");
    }

    return { data, statusCode };
}


export async function signOutBackend(token: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Error al cerrar sesion");
    }

    return data;
}

export async function resetPassword(id: string, token: string, newPassword: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, token, newPassword }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || "Error al restablecer la contraseña. Es posible que el enlace haya expirado.");
    }

    return data;
}

export async function forgotPassword(email: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || "Error al enviar el correo.");
    }

    return data;
}
