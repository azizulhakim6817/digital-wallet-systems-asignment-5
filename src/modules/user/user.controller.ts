import { Request, Response } from "express";
import { UserService } from "./user.service";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getSingleUser(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await UserService.deleteUser(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
