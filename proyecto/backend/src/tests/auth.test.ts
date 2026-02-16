import app from "../index";
import request from "supertest";

describe("Auth", () => {
    it("Debe registrar un nuevo usuario", async () => {
        const response = await request(app).post("/auth/register").send({
            full_name: "Arturo Castañeda",
            email: "prueba@gmail.com",
            password: "Ma12233@xc2",
        });
        expect(response.status).toBe(201);
    });

    it("Debe registrar un usuario con un correo electrónico inválido", async () => {
        const response = await request(app).post("/auth/register").send({
            full_name: "Arturo Castañeda",
            email: "prueba@gmai",
            password: "Ma12233@xc2",
        });
        expect(response.status).toBe(400);
    });

    it("Debe registrar un usuario con una contraseña inválida", async () => {
        const response = await request(app).post("/auth/register").send({
            full_name: "Arturo Castañeda",
            email: "prueba@gmail.com",
            password: "Ma12233",
        });
        expect(response.status).toBe(400);
    });

    it("Debe registrar un usuario con un nombre completo inválido", async () => {
        const response = await request(app).post("/auth/register").send({
            full_name: "",
            email: "prueba@gmail.com",
            password: "Ma12233@xc2",
        });
        expect(response.status).toBe(400);
    });

    it("Debe iniciar sesión con un usuario", async () => {
        const response = await request(app).post("/auth/login").send({
            email: "prueba@gmail.com",
            password: "Ma12233@xc2",
        });
        expect(response.status).toBe(200);
    });

    it("Debe iniciar sesión con un usuario con un correo electrónico inválido", async () => {
        const response = await request(app).post("/auth/login").send({
            email: "prueba@gmai",
            password: "Ma12233@xc2",
        });
        expect(response.status).toBe(400);
    });

    it("Debe iniciar sesión con un usuario con una contraseña inválida", async () => {
        const response = await request(app).post("/auth/login").send({
            email: "prueba@gmail.com",
            password: "Ma12233",
        });
        expect(response.status).toBe(400);
    });
});