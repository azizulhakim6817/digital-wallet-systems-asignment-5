
import Wallet from "../wallet/wallet.model";
import Transaction from "../transaction/transaction.model";

export const AdminService = {
  getAllUsers: async () => {
    const users = await User.find().select("-password");
    const wallets = await Wallet.find();

    const result = users.map((user) => {
      const wallet = wallets.find(
        (w) => w.userId.toString() === user._id.toString()
      );
      return {
        _id: user._id,
        email: user.email,
        role: user.role,
        balance: wallet?.balance ?? 0,
      };
    });

    return result;
  },

  getAllTransactions: async () => {
    return await Transaction.find().sort({ createdAt: -1 });
  },

  getSystemStats: async () => {
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const totalBalanceAgg = await Wallet.aggregate([
      { $group: { _id: null, totalBalance: { $sum: "$balance" } } },
    ]);

    return {
      totalUsers,
      totalTransactions,
      totalBalance: totalBalanceAgg[0]?.totalBalance ?? 0,
    };
  },
};
