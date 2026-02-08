import AuthController from "@controllers/AuthController";
import { checkAuth } from "@middlewares/checkAuth";
import { Router } from "express";

const routerAuth = Router();

routerAuth.post("/login", AuthController.login);
routerAuth.post("/register", AuthController.register);
routerAuth.post('/logout', checkAuth, AuthController.logout)

export default routerAuth;