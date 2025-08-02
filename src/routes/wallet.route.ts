import express from "express";
import {
  deposit,
  withdraw,
  send,
  balance,
} from "../modules/wallet/wallet.controller";

const router = express.Router();

// Deposit money into wallet
router.post("/deposit", deposit);

// Withdraw money from wallet
router.post("/withdraw", withdraw);

// Send money to another user's wallet
router.post("/send", send);

// Get the balance of the wallet
router.get("/balance", balance);

export const walletRoute = router;
