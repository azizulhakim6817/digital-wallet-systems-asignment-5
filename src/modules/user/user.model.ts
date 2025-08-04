import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
