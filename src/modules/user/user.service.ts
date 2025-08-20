import { User } from "./user.model";
import bcrypt from "bcrypt";

export const UserService = {
  getAllUsers: async () => {
    return await User.find();
  },

  getSingleUser: async (id: string) => {
    return await User.findById(id);
  },

  updateUser: async (
    id: string,
    data: Partial<{ email: string; password: string; role: string }>
  ) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
  },

  deleteUser: async (id: string) => {
    return await User.findByIdAndDelete(id);
  },
};

//! changePassword-----------------------------------
export const changePasswordService = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return false;
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Save the user with the new password
    await user.save();
    return true;
  } catch (error) {
    console.error("Error in changePasswordService:", error);
    throw new Error("Error updating password");
  }
};
