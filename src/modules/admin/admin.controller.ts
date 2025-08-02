import { Request, Response } from "express";
import { AdminService } from "./admin.service";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await AdminService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getAllTransactions = async (_req: Request, res: Response) => {
  try {
    const transactions = await AdminService.getAllTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

export const getSystemStats = async (_req: Request, res: Response) => {
  try {
    const stats = await AdminService.getSystemStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
