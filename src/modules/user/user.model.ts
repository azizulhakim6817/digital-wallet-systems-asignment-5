// src/app/modules/user/user.model.ts
import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", UserSchema); 
