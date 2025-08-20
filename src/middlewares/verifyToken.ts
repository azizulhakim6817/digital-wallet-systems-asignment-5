import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Custom interface to include `user` in the request object
interface CustomRequest extends Request {
  user?: any;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization as string;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden access", error });
  }
};
