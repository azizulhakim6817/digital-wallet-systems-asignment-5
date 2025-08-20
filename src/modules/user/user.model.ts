// src/modules/user/user.model.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IRequest extends Request {
  user?: {
    userId: string;
  };
}

export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "user";
  isPasswordMatch(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

// hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashed = await bcrypt.hash(this.password, 10);
  this.password = hashed;
  next();
});

// compare password
userSchema.methods.isPasswordMatch = async function (givenPassword: string) {
  return await bcrypt.compare(givenPassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
