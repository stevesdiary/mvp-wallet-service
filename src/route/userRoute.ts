import { Router } from "express";
import userController from "../controller/userController";

const router = Router();
router.post ("/user", userController.create);
router.get ("/user/:id", userController.getOne);
router.get ("/user", userController.getAll);
router.put("/user/:id", userController.updateUser);

export default router;