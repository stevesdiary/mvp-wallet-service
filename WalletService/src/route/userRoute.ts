import { Router } from "express";
import userController from "../controller/userController";

const router = Router();
router.post ("/user", userController.create);
router.get ("/user/:id", async (req, res)  =>  userController.getOne (req, res));
router.get ("/user", async (req, res)  =>  userController.getAll (req, res));
router.put("/user/:id", async (req, res)  =>  userController.updateUser (req, res));

export default router;