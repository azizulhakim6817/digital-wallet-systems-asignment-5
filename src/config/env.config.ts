import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
export const JWT_REFRESH_EXPIRES_IN = process.env
  .JWT_REFRESH_EXPIRES_IN as string;

export const DATABASE_URL = process.env.DATABASE_URL as string;
