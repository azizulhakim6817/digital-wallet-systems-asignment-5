import mongoose, { Schema, Document } from "mongoose";

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  SEND = "send",
  CASH_IN = "cash_in", // Agent adds money
  CASH_OUT = "cash_out", // Agent withdraws money
}

export interface ITransaction extends Document {
  userId: string;
  type: TransactionType;
  amount: number;
  balanceAfter: number;
  status: "pending" | "completed" | "reversed";
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    balanceAfter: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "reversed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);

export default Transaction;
