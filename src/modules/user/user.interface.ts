import { Document } from "mongoose";
import { Roles } from "../../constants/roles";

export interface IRequest extends Request {
  user?: {
    _id: string;
    role: Roles; // Make sure you are using the Roles enum
  };
}

export interface IChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  role: "user" | "agent" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}
