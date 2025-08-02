import { Request, Response, NextFunction } from "express";
import { Roles } from "../constants/roles";

interface IRequest extends Request {
  user?: {
    role: Roles;
  };
}

export const authorize = (roles: Roles[]) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
