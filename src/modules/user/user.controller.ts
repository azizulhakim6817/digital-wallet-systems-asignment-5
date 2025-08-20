import { Request, Response } from "express";

import { IChangePasswordBody } from "./user.interface";
import { User } from "./user.model";
import { changePasswordService, UserService } from "./user.service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
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

// !changePassword-----------------------------------------------------------
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body as IChangePasswordBody;
   const { _id: userId } = req.user!;
    const result = await changePasswordService(
      userId,
      oldPassword,
      newPassword
    );

    if (result) {
      return res.status(200).json({ message: "Password changed successfully" });
    } else {
      return res.status(400).json({ message: "Invalid old password" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error changing password",
      error: (error as Error).message,
    });
  }
};
