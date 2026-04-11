import { Router } from "express";
import PublicController from "@controllers/PublicController";

const router = Router();

router.get("/info", PublicController.getInfo);
router.get("/disponibilidad", PublicController.getDisponibilidad);

export default router;
