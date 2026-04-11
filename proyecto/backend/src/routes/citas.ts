import { Router } from "express";
import CitaController from "@controllers/CitaController";
import { checkAuth } from "@middlewares/checkAuth";
import { checkRole } from "@middlewares/checkRole";
import { validateData } from "@middlewares/validateData";
import {
    citaCreateSchema,
    citaUpdateSchema,
    citaIdSchema,
    citaListSchema
} from "@schemas/citaSchemas";

const router = Router();

router.use(checkAuth);
router.use(checkRole(["owner", "admin", "employee"]));

router.get("/", validateData(citaListSchema, "query"), CitaController.list);
router.get("/:id", validateData(citaIdSchema, "params"), CitaController.getById);
router.post("/", validateData(citaCreateSchema), CitaController.create);
router.put(
    "/:id",
    validateData(citaIdSchema, "params"),
    validateData(citaUpdateSchema),
    CitaController.update
);

export default router;
