import { Schema, model } from "mongoose";
import { IWallet } from "./wallet.interface";

const walletSchema = new Schema<IWallet>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Wallet = model<IWallet>("Wallet", walletSchema);

export default Wallet;
