import express from "express";
import {
  addMoney,
  withdrawMoney,
  sendMoney,
  getTransactionHistory,
} from "../modules/transaction/transaction.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { Roles } from "../constants/roles";

const router = express.Router();

router.post("/deposit", authenticate, addMoney);
router.post("/withdraw", authenticate, withdrawMoney);
router.post("/send", authenticate, sendMoney);
router.get("/history", authenticate, getTransactionHistory);

export const tarnsactionRoute = router;
