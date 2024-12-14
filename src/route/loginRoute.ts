import { Router } from "express";
const router = Router();
import loginController from "../controller/loginController";

router.post("/login", loginController.login);
router.post("/logout", loginController.logout);
export default router;
