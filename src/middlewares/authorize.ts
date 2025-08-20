import { Request, Response, NextFunction } from "express";
import { Roles } from "../constants/roles";

export const authorize = (roles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
