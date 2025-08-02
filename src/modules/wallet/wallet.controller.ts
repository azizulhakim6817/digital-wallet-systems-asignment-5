import { Request, Response } from "express";
import {
  depositMoney,
  withdrawMoney,
  sendMoney,
  getBalance,
} from "./wallet.service";

// Deposit money
export const deposit = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  try {
    const newBalance = await depositMoney(userId, amount);
    return res
      .status(200)
      .json({ message: "Money deposited successfully", balance: newBalance });
  } catch (error) {
     const e = error as Error;
  return res.status(500).json({ message: e.message });
  }
};

// Withdraw money
export const withdraw = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  try {
    const newBalance = await withdrawMoney(userId, amount);
    return res
      .status(200)
      .json({ message: "Money withdrawn successfully", balance: newBalance });
  } catch (error) {
   const e = error as Error;
  return res.status(500).json({ message: e.message });
  }
};

// Send money to another user's wallet
export const send = async (req: Request, res: Response) => {
  const { senderId, receiverId, amount } = req.body;
  try {
    const { senderBalance, receiverBalance } = await sendMoney(
      senderId,
      receiverId,
      amount
    );
    return res
      .status(200)
      .json({
        message: "Money sent successfully",
        senderBalance,
        receiverBalance,
      });
  } catch (error) {
     const e = error as Error;
  return res.status(500).json({ message: e.message });
  }
};

// Get wallet balance
export const balance = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const balance = await getBalance(userId);
    return res.status(200).json({ balance });
  } catch (error) {
     const e = error as Error;
  return res.status(500).json({ message: e.message });
  }
};
