import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  verifyRefreshToken,
  logoutUser,
} from "./auth.service";
import { generateAccessToken } from "../../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, accessToken, refreshToken } = await registerUser(
      email,
      password
    );

    // Store refresh token in HttpOnly cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      accessToken,
    });
  } catch (error) {
    const e = error as Error;
  return res.status(500).json({ message: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken } = await loginUser(email, password);

    // Store refresh token in HttpOnly cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    const e = error as Error;
  return res.status(500).json({ message: e.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken(userId);

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
   const e = error as Error;
  return res.status(500).json({ message: e.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("refresh_token");
  return res.status(200).json({ message: logoutUser() });
};
