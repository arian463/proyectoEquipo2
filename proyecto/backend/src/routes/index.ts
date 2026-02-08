import { Express } from "express";
import routerAuth from "./auth";

export default function routes(app: Express) {
    app.use("/auth", routerAuth);
}