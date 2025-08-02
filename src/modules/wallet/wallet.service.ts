import Wallet from './wallet.model'; // Wallet model import

// Deposit money into wallet
export const depositMoney = async (userId: string, amount: number) => {
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    throw new Error('Wallet not found');
  }
  wallet.balance += amount;
  await wallet.save();
  return wallet.balance;
};

// Withdraw money from wallet
export const withdrawMoney = async (userId: string, amount: number) => {
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    throw new Error('Wallet not found');
  }
  if (wallet.balance < amount) {
    throw new Error('Insufficient balance');
  }
  wallet.balance -= amount;
  await wallet.save();
  return wallet.balance;
};

// Send money to another user's wallet
export const sendMoney = async (senderId: string, receiverId: string, amount: number) => {
  const senderWallet = await Wallet.findOne({ userId: senderId });
  const receiverWallet = await Wallet.findOne({ userId: receiverId });

  if (!senderWallet || !receiverWallet) {
    throw new Error('Wallet not found');
  }
  if (senderWallet.balance < amount) {
    throw new Error('Insufficient balance');
  }

  senderWallet.balance -= amount;
  receiverWallet.balance += amount;

  await senderWallet.save();
  await receiverWallet.save();

  return { senderBalance: senderWallet.balance, receiverBalance: receiverWallet.balance };
};

// Get balance of a wallet
export const getBalance = async (userId: string) => {
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    throw new Error('Wallet not found');
  }
  return wallet.balance;
};
