import { Document, Types } from "mongoose";

export interface IWallet extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId; // পরিবর্তন: string → ObjectId
  balance: number;
}
