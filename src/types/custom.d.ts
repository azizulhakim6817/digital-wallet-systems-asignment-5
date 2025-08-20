import { Roles } from "../constants/roles";

declare global {
  namespace Express {
    interface User {
      _id: string;
      role: Roles;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
