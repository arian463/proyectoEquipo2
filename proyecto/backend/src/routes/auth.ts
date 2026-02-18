import AuthController from "@controllers/AuthController";
import { checkAuth } from "@middlewares/checkAuth";
import { Router } from "express";
import { userLoginSchema, userRegisterSchema } from "@schemas/userSchemas";
import { validateData } from "@middlewares/validateData";

const routerAuth = Router();

routerAuth.post("/login", validateData(userLoginSchema), AuthController.login);
routerAuth.post("/register", validateData(userRegisterSchema), AuthController.register);
routerAuth.post('/logout', checkAuth, AuthController.logout)

export default routerAuth;