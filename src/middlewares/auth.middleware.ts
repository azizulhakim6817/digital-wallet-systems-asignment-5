import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../modules/user/user.model";


interface IRequest extends Request {
  userId?: string;
  user?: { role: string };
}

export const authenticate = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    req.userId = decoded.userId;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = { role: user.role }; 

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
