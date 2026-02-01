import AuthController from "@controllers/AuthController";
import { Router } from "express";

const routerAuth = Router();

routerAuth.post("/register", AuthController.register)

export default routerAuth;