import { Express } from "express";
import routerAuth from "./auth";
import routerServicios from "./servicios";
import routerEmpleados from "./empleados";
import routerNegocio from "./negocio";
import routerClientes from "./clientes";
import routerCitas from "./citas";
import routerDashboard from "./dashboard";
import routerPublic from "./public";

export default function routes(app: Express) {
    app.use("/auth", routerAuth);
    app.use("/servicios", routerServicios);
    app.use("/empleados", routerEmpleados);
    app.use("/negocio", routerNegocio);
    app.use("/clientes", routerClientes);
    app.use("/citas", routerCitas);
    app.use("/dashboard", routerDashboard);
    app.use("/public", routerPublic);
}
