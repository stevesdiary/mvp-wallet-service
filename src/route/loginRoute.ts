import { Router } from "express";
const router = Router();
import loginController from "../controller/loginController";

router.post("/user/login", loginController.login)

export default router;
