// src/app/modules/user/user.interface.ts
import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId; // ✅ এখানে স্পষ্টভাবে _id টাইপ দিন
  email: string;
  password: string;
  name?: string;
  role: "user" | "agent" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}
