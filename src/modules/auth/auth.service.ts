import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { Types } from "mongoose";

export const registerUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  return { user };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(
    (user._id as Types.ObjectId).toString()
  );

  const refreshToken = generateRefreshToken(
    (user._id as Types.ObjectId).toString()
  );

  return { accessToken, refreshToken };
};

export const verifyRefreshToken = (token: string) => {
  return new Promise<string>((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
      (err, decoded) => {
        if (err) reject("Invalid token");
        else resolve((decoded as any).userId);
      }
    );
  });
};
