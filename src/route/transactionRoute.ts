import { Router } from "express";
const router = Router();
import transactionController from "../controller/transactionController";

// router.post("/transaction/create", transactionController.create);
router.get("/transactions", transactionController.getAll);
router.delete("/transaction/:id", transactionController.delete);
router.get("/transaction/:id", transactionController.getOne);
router.post("/transaction/transfer", transactionController.transferFunds);
router.post("/transaction/fund", transactionController.fundAccount);
router.post("/transaction/withdraw", transactionController.withdraw);
export default router;
