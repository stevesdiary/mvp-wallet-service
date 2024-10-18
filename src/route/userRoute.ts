import { Router } from "express";
import userController from "../controller/userController";
import { authentication } from "../middleware/authentication";

const router = Router();
router.post ("/user", authentication, userController.create);
router.get ("/user/:id", userController.getOne);
router.get ("/user", userController.getAll);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser)

export default router;