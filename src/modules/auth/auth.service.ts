import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../user/user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

export const registerUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
  });

  await user.save();

  const accessToken = generateAccessToken((user._id as any).toString());
  const refreshToken = generateRefreshToken((user._id as any).toString());

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

const accessToken = generateAccessToken((user._id as any).toString());
const refreshToken = generateRefreshToken((user._id as any).toString());

  return { accessToken, refreshToken };
};

export const verifyRefreshToken = (refreshToken: string) => {
  return new Promise<string>((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
      (err, decoded) => {
        if (err) {
          reject(new Error("Invalid refresh token"));
        } else {
          resolve((decoded as any).userId);
        }
      }
    );
  });
};

export const logoutUser = () => {
  return "Logged out successfully";
};
