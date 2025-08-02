import express from "express";
import {
  addMoney,
  withdrawMoney,
  sendMoney,
  getTransactionHistory,
} from "../modules/transaction/transaction.controller";
import { asyncWrapper } from "../utils/asyncWrapper";

const router = express.Router();

router.post("/deposit", asyncWrapper, addMoney);
router.post("/withdraw", asyncWrapper, withdrawMoney);
router.post("/send", asyncWrapper, sendMoney);
router.get("/history", asyncWrapper, getTransactionHistory);

export const tarnsactionRoute = router;
