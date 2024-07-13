import { Router } from "express";
import userController from "../controller/userController";

const router = Router();
router.post ("/user", userController.create);
router.get ("/user/:id", userController.getOne);
router.get ("/user", userController.getAll);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.post("/user/blacklistuser", userController.addUserToBlacklist);
router.get("/user/blacklist", userController.getBlacklist);
router.delete("/user/removeblacklist/:id", userController.removeBlacklist);

export default router;