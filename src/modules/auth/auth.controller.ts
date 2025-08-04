import { Request, Response } from "express";
import { registerUser, loginUser, verifyRefreshToken } from "./auth.service";
import { generateAccessToken } from "../../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user } = await registerUser(email, password);
    res.status(201).json({ message: "User created", user });
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await loginUser(email, password);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (e) {
    res.status(401).json({ message: (e as Error).message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refresh_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const userId = await verifyRefreshToken(token);
    const newAccessToken = generateAccessToken(userId);
    res.json({ accessToken: newAccessToken });
  } catch (e) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("refresh_token");
  res.json({ message: "Logged out successfully" });
};
