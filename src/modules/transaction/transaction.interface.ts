import { Document, Types } from "mongoose";

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  SEND = "send",
  CASH_IN = "cash_in", // Agent adds money
  CASH_OUT = "cash_out", // Agent withdraws money
}

export interface ITransaction extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  type: TransactionType;
  amount: number;
  balanceAfter: number;
  status: "pending" | "completed" | "reversed";
  createdAt: Date;
  updatedAt: Date;
}
