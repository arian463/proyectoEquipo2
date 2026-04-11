import ServicioController from "@controllers/ServicioController";
import { checkAuth } from "@middlewares/checkAuth";
import { checkRole } from "@middlewares/checkRole";
import { Router } from "express";
import { servicioCreateSchema, servicioUpdateSchema, servicioIdSchema } from "@schemas/servicioSchemas";
import { validateData } from "@middlewares/validateData";

const routerServicios = Router();

// Todas las rutas requieren autenticación
routerServicios.use(checkAuth);

// Solo admin/owner pueden gestionar servicios
routerServicios.use(checkRole(['owner', 'admin']));

// GET /servicios - Obtener todos los servicios (admin)
routerServicios.get("/", ServicioController.getAll);

// GET /servicios/active - Obtener servicios activos (para citas)
routerServicios.get("/active", ServicioController.getActive);

// GET /servicios/:id - Obtener servicio por ID
routerServicios.get("/:id", validateData(servicioIdSchema, 'params'), ServicioController.getById);

// POST /servicios - Crear nuevo servicio
routerServicios.post("/", validateData(servicioCreateSchema), ServicioController.create);

// PUT /servicios/:id - Actualizar servicio
routerServicios.put("/:id", validateData(servicioUpdateSchema), ServicioController.update);

// PATCH /servicios/:id/toggle - Activar/desactivar servicio
routerServicios.patch("/:id/toggle", validateData(servicioIdSchema, 'params'), ServicioController.toggleActive);

// DELETE /servicios/:id - Eliminar servicio
routerServicios.delete("/:id", validateData(servicioIdSchema, 'params'), ServicioController.delete);

export default routerServicios;