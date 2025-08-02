import { Request, Response } from 'express';
import Wallet from '../wallet/wallet.model';
import Transaction, { TransactionType } from './transaction.model';

export const addMoney = async (req: Request, res: Response) => {
  const { amount } = req.body;

  try {
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero' });
    }

    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet || wallet.isBlocked) {
      return res.status(400).json({ message: 'Wallet not found or is blocked' });
    }

    wallet.balance += amount;
    const updatedWallet = await wallet.save();

    // Record transaction
    const transaction = new Transaction({
      userId: req.userId,
      type: TransactionType.DEPOSIT,
      amount,
      balanceAfter: updatedWallet.balance,
      status: 'completed',
    });
    await transaction.save();

    return res.status(200).json({ message: 'Money added successfully', balance: updatedWallet.balance });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const withdrawMoney = async (req: Request, res: Response) => {
  const { amount } = req.body;

  try {
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero' });
    }

    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet || wallet.isBlocked) {
      return res.status(400).json({ message: 'Wallet not found or is blocked' });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    wallet.balance -= amount;
    const updatedWallet = await wallet.save();

    // Record transaction
    const transaction = new Transaction({
      userId: req.userId,
      type: TransactionType.WITHDRAW,
      amount,
      balanceAfter: updatedWallet.balance,
      status: 'completed',
    });
    await transaction.save();

    return res.status(200).json({ message: 'Money withdrawn successfully', balance: updatedWallet.balance });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const sendMoney = async (req: Request, res: Response) => {
  const { recipientId, amount } = req.body;

  try {
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero' });
    }

    const senderWallet = await Wallet.findOne({ userId: req.userId });
    const recipientWallet = await Wallet.findOne({ userId: recipientId });

    if (!senderWallet || senderWallet.isBlocked) {
      return res.status(400).json({ message: 'Sender wallet not found or is blocked' });
    }

    if (!recipientWallet) {
      return res.status(400).json({ message: 'Recipient wallet not found' });
    }

    if (senderWallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct from sender and add to recipient
    senderWallet.balance -= amount;
    recipientWallet.balance += amount;

    await senderWallet.save();
    await recipientWallet.save();

    // Record sender's transaction
    const senderTransaction = new Transaction({
      userId: req.userId,
      type: TransactionType.SEND,
      amount,
      balanceAfter: senderWallet.balance,
      status: 'completed',
    });
    await senderTransaction.save();

    // Record recipient's transaction
    const recipientTransaction = new Transaction({
      userId: recipientId,
      type: TransactionType.SEND,
      amount,
      balanceAfter: recipientWallet.balance,
      status: 'completed',
    });
    await recipientTransaction.save();

    return res.status(200).json({
      message: 'Money sent successfully',
      senderBalance: senderWallet.balance,
      recipientBalance: recipientWallet.balance,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const getTransactionHistory = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};


export const cashIn = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  try {
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero' });
    }

    const agentWallet = await Wallet.findOne({ userId: req.userId });
    const userWallet = await Wallet.findOne({ userId });

    if (!agentWallet || agentWallet.isBlocked) {
      return res.status(400).json({ message: 'Agent wallet not found or is blocked' });
    }

    if (!userWallet || userWallet.isBlocked) {
      return res.status(400).json({ message: 'User wallet not found or is blocked' });
    }

    // Agent performs cash-in for user
    userWallet.balance += amount;
    const updatedUserWallet = await userWallet.save();

    // Record transaction for user
    const transaction = new Transaction({
      userId: userId,
      type: TransactionType.CASH_IN,
      amount,
      balanceAfter: updatedUserWallet.balance,
      status: 'completed',
    });
    await transaction.save();

    return res.status(200).json({ message: 'Cash-in successful', balance: updatedUserWallet.balance });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const cashOut = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  try {
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero' });
    }

    const agentWallet = await Wallet.findOne({ userId: req.userId });
    const userWallet = await Wallet.findOne({ userId });

    if (!agentWallet || agentWallet.isBlocked) {
      return res.status(400).json({ message: 'Agent wallet not found or is blocked' });
    }

    if (!userWallet || userWallet.isBlocked) {
      return res.status(400).json({ message: 'User wallet not found or is blocked' });
    }

    if (userWallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Agent performs cash-out for user
    userWallet.balance -= amount;
    const updatedUserWallet = await userWallet.save();

    // Record transaction for user
    const transaction = new Transaction({
      userId: userId,
      type: TransactionType.CASH_OUT,
      amount,
      balanceAfter: updatedUserWallet.balance,
      status: 'completed',
    });
    await transaction.save();

    return res.status(200).json({ message: 'Cash-out successful', balance: updatedUserWallet.balance });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
