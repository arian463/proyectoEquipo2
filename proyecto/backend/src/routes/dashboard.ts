import { Router } from "express";
import DashboardController from "@controllers/DashboardController";
import { checkAuth } from "@middlewares/checkAuth";
import { checkRole } from "@middlewares/checkRole";

const router = Router();

router.use(checkAuth);
router.use(checkRole(["owner", "admin", "employee"]));

router.get("/metrics", DashboardController.metrics);

export default router;
