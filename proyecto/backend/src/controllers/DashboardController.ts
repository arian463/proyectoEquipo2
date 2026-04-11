import { Request, Response } from "express";
import DashboardService from "@services/DashboardService";

class DashboardController {
    static async metrics(req: Request, res: Response) {
        try {
            const data = await DashboardService.getMetrics();
            res.json({ success: true, data });
        } catch (error: any) {
            console.error("Error obteniendo métricas del dashboard:", error);
            res.status(500).json({ success: false, message: "Error interno del servidor" });
        }
    }
}

export default DashboardController;
