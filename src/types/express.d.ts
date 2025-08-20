// src/types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: { _id: string; role: string }; // Define the expected shape of the user object
    }
  }
}
