import { Router } from "express";
const router = Router();
import transactionController from "../controller/transactionController";

router.post("/createtransaction", transactionController.create);
router.get("/alltransactions", transactionController.getAll);
router.delete("/deleteaccount/:id", transactionController.delete);
router.get("/account/:id", transactionController.getOne);
router.post("/transaction/transfer", transactionController.transferFunds);
router.post("/transaction/fund", transactionController.fundAccount);
router.get("/transaction/withdraw", transactionController.withdraw);
export default router;
