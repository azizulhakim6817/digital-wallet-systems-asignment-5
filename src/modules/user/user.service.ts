import { User } from "./user.model";

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
