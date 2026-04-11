import request from "supertest";
import app from "../index";
import pool from "@config/db";

describe("Disponibilidad de citas", () => {
    const ownerEmail = "availability-owner@test.com";
    const ownerPassword = "Ma12233@xc2";
    const clienteEmail = "cliente-availability@test.com";
    const servicioId = 950;
    const horarioId = 950;
    let token = "";
    let clienteId = 0;
    const targetDate = new Date();

    beforeAll(async () => {
        targetDate.setDate(targetDate.getDate() + 1);
        const diaSemana = targetDate.getDay();
        const fechaStr = targetDate.toISOString().split("T")[0];

        await pool.query("DELETE FROM users WHERE email = ?", [ownerEmail]);

        await pool.query(
            `
            INSERT INTO servicios (id, nombre, descripcion, precio, duracion_minutos, activo)
            VALUES (?, ?, ?, ?, ?, 1)
            ON DUPLICATE KEY UPDATE
                nombre = VALUES(nombre),
                descripcion = VALUES(descripcion),
                precio = VALUES(precio),
                duracion_minutos = VALUES(duracion_minutos),
                activo = VALUES(activo)
            `,
            [servicioId, "Consultoría rápida", "Cita de 60 minutos para revisión", 650, 60]
        );

        await pool.query(
            `
            REPLACE INTO horarios (id, dia_semana, hora_inicio, hora_fin, activo)
            VALUES (?, ?, ?, ?, 1)
            `,
            [horarioId, diaSemana, "09:00:00", "17:00:00"]
        );

        await pool.query("DELETE FROM fechas_deshabilitadas WHERE fecha = ?", [fechaStr]);

        const [clienteResult] = await pool.query(
            `
            INSERT INTO clientes (nombre, email, telefono)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE telefono = VALUES(telefono)
            `,
            ["Cliente availability", clienteEmail, "+521234567890"]
        );
        const clienteInsertId = (clienteResult as any).insertId;
        clienteId = clienteInsertId || (await getClienteId(clienteEmail));

        await request(app).post("/auth/register").send({
            full_name: "Admin Disponibilidad",
            email: ownerEmail,
            password: ownerPassword
        });

        const login = await request(app).post("/auth/login").send({
            email: ownerEmail,
            password: ownerPassword
        });

        token = login.body.data?.token;
        if (!token) {
            throw new Error("No se obtuvo token de autenticación");
        }
    });

    afterAll(async () => {
        await pool.query("DELETE FROM citas WHERE servicio_id = ?", [servicioId]);
        await pool.query("DELETE FROM clientes WHERE email = ?", [clienteEmail]);
        await pool.query("DELETE FROM users WHERE email = ?", [ownerEmail]);
        await pool.query("DELETE FROM servicios WHERE id = ?", [servicioId]);
        await pool.query("DELETE FROM horarios WHERE id = ?", [horarioId]);
    });

    it("debe exponer disponibilidad antes de crear una cita y bloquear reservas duplicadas", async () => {
        const fecha = targetDate.toISOString().split("T")[0];

        const disponibilidad = await request(app)
            .get("/public/disponibilidad")
            .query({ fecha, servicio_id: servicioId });

        expect(disponibilidad.status).toBe(200);
        expect(Array.isArray(disponibilidad.body.data)).toBe(true);
        const slot = disponibilidad.body.data.find((s: any) => s.hora_inicio === "09:00");
        expect(slot).toBeDefined();

        const payload = {
            cliente_id: clienteId,
            servicio_id: servicioId,
            fecha,
            hora_inicio: "09:00"
        };

        const primera = await request(app)
            .post("/citas")
            .set("Authorization", `Bearer ${token}`)
            .send(payload);

        expect(primera.status).toBe(201);

        const duplicada = await request(app)
            .post("/citas")
            .set("Authorization", `Bearer ${token}`)
            .send(payload);

        expect(duplicada.status).toBe(409);
    });
});

async function getClienteId(email: string) {
    const [rows] = await pool.query("SELECT id FROM clientes WHERE email = ?", [email]);
    return (rows as any[])[0]?.id ?? 0;
}
