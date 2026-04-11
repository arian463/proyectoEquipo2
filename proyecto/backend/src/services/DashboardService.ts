import CitaModel from "@models/CitaModel";

class DashboardService {
    static async getMetrics() {
        const totalesPorMes = await CitaModel.getTotalsByMonth(12);
        const totalesPorEstado = await CitaModel.getTotalsByEstado();
        const proximas = await CitaModel.getProximas(7);

        const hoy = new Date();
        const fechaHoy = `${hoy.getFullYear().toString().padStart(4, "0")}-${(hoy.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${hoy.getDate().toString().padStart(2, "0")}`;

        const proximasHoy = await CitaModel.getDelDia(fechaHoy);

        return {
            totalesPorMes,
            totalesPorEstado,
            proximas,
            proximasHoy
        };
    }
}

export default DashboardService;
