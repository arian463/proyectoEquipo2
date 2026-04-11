import pool from "@config/db";

async function seedNegocio() {
    const negocioData = {
        nombre: "Centro Integral de Bienestar",
        especialidad: "Estética y Terapias",
        descripcion: "Un espacio diseñado para brindar tratamientos personalizados con tecnología de punta.",
        direccion: "Av. Siempre Viva 742",
        telefono: "+525512345678",
        correo: "contacto@bienestar.app",
        whatsapp_url: "https://wa.me/525512345678",
        facebook_url: "https://www.facebook.com/bienestar",
        instagram_url: "https://www.instagram.com/bienestar",
        logo_url: "https://res.cloudinary.com/demo/image/upload/v1610000000/logo.png",
        hora_apertura: "09:00:00",
        hora_cierre: "20:00:00",
        rating_promedio: 4.9,
        resenas_count: 128
    };

    await pool.query(
        `
        INSERT INTO negocio (id, nombre, especialidad, descripcion, direccion, telefono, correo, whatsapp_url, facebook_url, instagram_url, logo_url, hora_apertura, hora_cierre, rating_promedio, resenas_count)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            nombre = VALUES(nombre),
            especialidad = VALUES(especialidad),
            descripcion = VALUES(descripcion),
            direccion = VALUES(direccion),
            telefono = VALUES(telefono),
            correo = VALUES(correo),
            whatsapp_url = VALUES(whatsapp_url),
            facebook_url = VALUES(facebook_url),
            instagram_url = VALUES(instagram_url),
            logo_url = VALUES(logo_url),
            hora_apertura = VALUES(hora_apertura),
            hora_cierre = VALUES(hora_cierre),
            rating_promedio = VALUES(rating_promedio),
            resenas_count = VALUES(resenas_count)
        `,
        [
            1,
            negocioData.nombre,
            negocioData.especialidad,
            negocioData.descripcion,
            negocioData.direccion,
            negocioData.telefono,
            negocioData.correo,
            negocioData.whatsapp_url,
            negocioData.facebook_url,
            negocioData.instagram_url,
            negocioData.logo_url,
            negocioData.hora_apertura,
            negocioData.hora_cierre,
            negocioData.rating_promedio,
            negocioData.resenas_count
        ]
    );
}

async function seedServicios() {
    const servicios = [
        {
            id: 901,
            nombre: "Consulta inicial",
            descripcion: "Evaluación completa con especialista y plan de seguimiento.",
            precio: 450,
            duracion_minutos: 45
        },
        {
            id: 902,
            nombre: "Terapia relajante",
            descripcion: "Masaje de cuerpo completo con aromaterapia.",
            precio: 750,
            duracion_minutos: 60
        }
    ];

    for (const servicio of servicios) {
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
            [servicio.id, servicio.nombre, servicio.descripcion, servicio.precio, servicio.duracion_minutos]
        );
    }
}

async function seedHorarios() {
    const horarios = [
        { id: 801, dia_semana: 1, hora_inicio: "09:00:00", hora_fin: "18:00:00" },
        { id: 802, dia_semana: 2, hora_inicio: "09:00:00", hora_fin: "18:00:00" },
        { id: 803, dia_semana: 3, hora_inicio: "09:00:00", hora_fin: "18:00:00" },
        { id: 804, dia_semana: 4, hora_inicio: "09:00:00", hora_fin: "18:00:00" },
        { id: 805, dia_semana: 5, hora_inicio: "09:00:00", hora_fin: "20:00:00" }
    ];

    for (const horario of horarios) {
        await pool.query(
            `
            INSERT INTO horarios (id, dia_semana, hora_inicio, hora_fin, activo)
            VALUES (?, ?, ?, ?, 1)
            ON DUPLICATE KEY UPDATE
                dia_semana = VALUES(dia_semana),
                hora_inicio = VALUES(hora_inicio),
                hora_fin = VALUES(hora_fin),
                activo = VALUES(activo)
            `,
            [horario.id, horario.dia_semana, horario.hora_inicio, horario.hora_fin]
        );
    }
}

async function seedFechasDeshabilitadas() {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 30);
    const fechaStr = fecha.toISOString().split("T")[0];

    await pool.query(
        `
        INSERT INTO fechas_deshabilitadas (id, fecha, motivo)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE motivo = VALUES(motivo)
        `,
        [901, fechaStr, "Mantenimiento del spa"]
    );
}

async function main() {
    console.log("Iniciando seed de la base de datos...");
    try {
        await seedNegocio();
        await seedServicios();
        await seedHorarios();
        await seedFechasDeshabilitadas();

        console.log("Seed completado.");
    } catch (error) {
        console.error("Error durante seed:", error);
    } finally {
        await pool.end();
    }
}

main();
