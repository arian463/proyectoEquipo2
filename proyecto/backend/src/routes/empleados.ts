import EmpleadoController from "@controllers/EmpleadoController";
import { checkAuth } from "@middlewares/checkAuth";
import { checkRole } from "@middlewares/checkRole";
import { Router } from "express";
import { empleadoCreateSchema, empleadoUpdateSchema, empleadoIdSchema } from "@schemas/empleadoSchemas";
import { validateData } from "@middlewares/validateData";

const routerEmpleados = Router();

// Todas las rutas requieren autenticación
routerEmpleados.use(checkAuth);

// Solo admin/owner pueden gestionar empleados
routerEmpleados.use(checkRole(['owner', 'admin']));

// GET /empleados - Obtener todos los empleados
routerEmpleados.get("/", EmpleadoController.getAll);

// GET /empleados/active - Obtener empleados activos
routerEmpleados.get("/active", EmpleadoController.getActive);

// GET /empleados/:id - Obtener empleado por ID
routerEmpleados.get("/:id", validateData(empleadoIdSchema, 'params'), EmpleadoController.getById);

// POST /empleados - Crear nuevo empleado
routerEmpleados.post("/", validateData(empleadoCreateSchema), EmpleadoController.create);

// PUT /empleados/:id - Actualizar empleado
routerEmpleados.put("/:id", validateData(empleadoUpdateSchema), EmpleadoController.update);

// PATCH /empleados/:id/toggle - Activar/desactivar empleado
routerEmpleados.patch("/:id/toggle", validateData(empleadoIdSchema, 'params'), EmpleadoController.toggleEstado);

// DELETE /empleados/:id - Eliminar empleado
routerEmpleados.delete("/:id", validateData(empleadoIdSchema, 'params'), EmpleadoController.delete);

export default routerEmpleados;