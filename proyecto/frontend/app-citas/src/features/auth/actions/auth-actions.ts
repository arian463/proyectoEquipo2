"use server"
import { getBackendUrl } from "@/lib/backend";

const backendUrl = getBackendUrl();

export type ValidationDetail = {
    field: string;
    message: string;
    example?: string;
};

type RegisterSuccess = {
    ok: true;
    data: unknown;
};

type RegisterFailure = {
    ok: false;
    message: string;
    validation?: ValidationDetail[];
};

type BackendErrorPayload = {
    status?: string;
    message?: string;
    error?: string;
    validation?: ValidationDetail[];
};

export async function registerUser(full_name: string, email: string, password: string, role: string, phone: string): Promise<RegisterSuccess | RegisterFailure> {
    let res: Response;

    try {
        res = await fetch(`${backendUrl}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ full_name, email, password, role, phone }),
        });
    } catch (error) {
        return {
            ok: false,
            message: "No fue posible conectarse con el servidor",
        };
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        const parsed = data as BackendErrorPayload;
        return {
            ok: false,
            message: parsed.message || parsed.error || "Error al registrar usuario",
            validation: parsed.validation,
        };
    }

    return {
        ok: true,
        data,
    };
}


export async function signOutBackend(token: string) {
    const res = await fetch(`${backendUrl}/auth/logout`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Error al cerrar sesion");
    }

    return data;
}
