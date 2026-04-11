import pool from "@config/db";

interface ListarFiltros {
    clienteId?: number;
    servicioId?: number;
    fecha?: string;
    estado?: "pendiente" | "confirmada" | "completada" | "cancelada";
}

class CitaModel {
    static async getAll(filtros: ListarFiltros = {}) {
        try {
            const condiciones: string[] = [];
            const valores: (string | number)[] = [];

            if (filtros.clienteId) {
                condiciones.push("c.cliente_id = ?");
                valores.push(filtros.clienteId);
            }
            if (filtros.servicioId) {
                condiciones.push("c.servicio_id = ?");
                valores.push(filtros.servicioId);
            }
            if (filtros.fecha) {
                condiciones.push("c.fecha = ?");
                valores.push(filtros.fecha);
            }
            if (filtros.estado) {
                condiciones.push("c.estado = ?");
                valores.push(filtros.estado);
            }

            const whereClause = condiciones.length ? `WHERE ${condiciones.join(" AND ")}` : "";

            const [citas] = await pool.query(
                `
                SELECT
                    c.*,
                    cli.nombre AS cliente_nombre,
                    cli.telefono AS cliente_telefono,
                    s.nombre AS servicio_nombre,
                    e.nombre AS empleado_nombre
                FROM citas c
                LEFT JOIN clientes cli ON c.cliente_id = cli.id
                LEFT JOIN servicios s ON c.servicio_id = s.id
                LEFT JOIN empleados e ON c.empleado_id = e.id
                ${whereClause}
                ORDER BY c.fecha DESC, c.hora_inicio DESC
                `,
                valores
            );

            return citas as any;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id: number) {
        try {
            const [cita] = await pool.query(
                `
                SELECT
                    c.*,
                    cli.nombre AS cliente_nombre,
                    cli.telefono AS cliente_telefono,
                    s.nombre AS servicio_nombre,
                    e.nombre AS empleado_nombre
                FROM citas c
                LEFT JOIN clientes cli ON c.cliente_id = cli.id
                LEFT JOIN servicios s ON c.servicio_id = s.id
                LEFT JOIN empleados e ON c.empleado_id = e.id
                WHERE c.id = ?
                `,
                [id]
            );
            return (cita as any[])[0] ?? null;
        } catch (error) {
            throw error;
        }
    }

    static async create(datos: {
        cliente_id: number;
        servicio_id: number;
        empleado_id?: number | null;
        fecha: string;
        hora_inicio: string;
        hora_fin: string;
        estado?: "pendiente" | "confirmada" | "completada" | "cancelada";
        precio: number;
        notas?: string | null;
    }) {
        try {
            const [result] = await pool.query(
                `
                INSERT INTO citas (
                    cliente_id,
                    servicio_id,
                    empleado_id,
                    fecha,
                    hora_inicio,
                    hora_fin,
                    estado,
                    precio,
                    notas
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    datos.cliente_id,
                    datos.servicio_id,
                    datos.empleado_id || null,
                    datos.fecha,
                    datos.hora_inicio,
                    datos.hora_fin,
                    datos.estado || "pendiente",
                    datos.precio,
                    datos.notas || null
                ]
            );
            const citaId = (result as any).insertId;
            const cita = await this.getById(citaId);
            return cita;
        } catch (error) {
            throw error;
        }
    }

    static async update(id: number, datos: Partial<{
        cliente_id: number;
        servicio_id: number;
        empleado_id: number | null;
        fecha: string;
        hora_inicio: string;
        hora_fin: string;
        estado: "pendiente" | "confirmada" | "completada" | "cancelada";
        precio: number;
        notas: string | null;
    }>) {
        try {
            const campos = Object.keys(datos);
            if (!campos.length) {
                throw new Error("No hay campos para actualizar");
            }

            const valores: (string | number | null)[] = [];

            const setClause = campos
                .map((campo) => {
                    valores.push((datos as any)[campo]);
                    return `${campo} = ?`;
                })
                .join(", ");

            valores.push(id);

            await pool.query(`UPDATE citas SET ${setClause} WHERE id = ?`, valores);
            return await this.getById(id);
        } catch (error) {
            throw error;
        }
    }

    static async getCitasPorFecha(fecha: string) {
        try {
            const [citas] = await pool.query(
                `
                SELECT *
                FROM citas
                WHERE fecha = ?
                  AND estado != 'cancelada'
                `,
                [fecha]
            );
            return citas as any;
        } catch (error) {
            throw error;
        }
    }

    static async getConflictos(fecha: string, horaInicio: string, horaFin: string) {
        try {
            const [citas] = await pool.query(
                `
                SELECT *
                FROM citas
                WHERE fecha = ?
                  AND estado != 'cancelada'
                  AND NOT (hora_fin <= ? OR hora_inicio >= ?)
                `,
                [fecha, horaInicio, horaFin]
            );
            return citas as any;
        } catch (error) {
            throw error;
        }
    }

    static async getTotalsByMonth(limit: number = 6) {
        try {
            const [result] = await pool.query(
                `
                SELECT DATE_FORMAT(fecha, '%Y-%m') AS mes, COUNT(*) AS total
                FROM citas
                GROUP BY mes
                ORDER BY mes DESC
                LIMIT ?
                `,
                [limit]
            );
            return result as any;
        } catch (error) {
            throw error;
        }
    }

    static async getTotalsByEstado() {
        try {
            const [result] = await pool.query(
                `
                SELECT estado, COUNT(*) AS total
                FROM citas
                GROUP BY estado
                `
            );
            return result as any;
        } catch (error) {
            throw error;
        }
    }

    static async getProximas(windowDays: number = 7) {
        try {
            const [result] = await pool.query(
                `
                SELECT *
                FROM citas
                WHERE fecha BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL ? DAY)
                  AND estado != 'cancelada'
                ORDER BY fecha ASC, hora_inicio ASC
                `,
                [windowDays]
            );
            return result as any;
        } catch (error) {
            throw error;
        }
    }

    static async getDelDia(fecha: string) {
        try {
            const [result] = await pool.query(
                `
                SELECT *
                FROM citas
                WHERE fecha = ?
                  AND estado != 'cancelada'
                ORDER BY hora_inicio ASC
                `,
                [fecha]
            );
            return result as any;
        } catch (error) {
            throw error;
        }
    }
}

export default CitaModel;
