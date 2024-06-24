import { AppDataSource } from "../data-source";
import { Transaction } from "../entity/Transaction";
import { User } from "../entity/User";
import { Request, Response } from "express";

const transactionRepository = AppDataSource.getRepository(Transaction);
const userRepository = AppDataSource.manager.getRepository(User);
interface TransactionCreationData {
  transactionType: string;
  amount: number;
  recipientAccountNumber: string;
  senderAccountNumber: string;
  date: any;
}
//const (Create transaction outside and call the function in the )
const transactionController = {
  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { senderAccountNumber, transactionType, amount, recipientAccountNumber } = req.body;

      const transaction: TransactionCreationData = {
        transactionType,
        senderAccountNumber,
        recipientAccountNumber,
        amount,
        date: new Date()
      }
      const newTransaction = transactionRepository.create(transaction);
      await transactionRepository.save(newTransaction);
      return res.status(201).json({ message: 'Transaction successful', newTransaction })
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error })
    }
  },

  transferFunds: async (req: Request, res: Response,): Promise<Response> => {
    try {
      const { amount, recipientAccountNumber, senderAccountNumber, transactionType } = req.body;
      const sender = await userRepository.findOne({
        where: {
          accountNumber: senderAccountNumber
        }
      })
      const recipient = await userRepository.findOne({ where: { accountNumber: recipientAccountNumber } })
      if (!senderAccountNumber || !recipientAccountNumber || !amount) {
        return res.status(404).send({ message: 'SenderAccountNumber, RecipientAccountNumber and amount are required' })
      }
      if (!sender) return res.status(404).send({ message: "Sender not found" })
      if (!recipient) return res.status(404).send({ message: "Recipient not found" })
      if (sender.balance < amount) return res.status(401).send({ message: 'Insufficient amount' })
      sender.balance -= amount;
      recipient.balance += amount;
      await userRepository.save(sender);
      await userRepository.save(recipient);
      const creditTransaction: TransactionCreationData = {
        transactionType: 'credit',
        senderAccountNumber,
        recipientAccountNumber,
        amount,
        date: new Date(),
      }
      const debitTransaction: TransactionCreationData = {
        transactionType: 'debit',
        senderAccountNumber,
        recipientAccountNumber,
        amount: - amount,
        date: new Date(),
      }
      const newCreditTransaction = transactionRepository.create(creditTransaction);
      await transactionRepository.save(newCreditTransaction);
      const newDebitTransaction = transactionRepository.create(debitTransaction);
      await transactionRepository.save(newDebitTransaction);

      return res.status(200).json({ message: `${sender.firstName} successfully transferred #${amount} to ${recipient.firstName}` })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Error", error })
    }
  },

  fundAccount: async (req: Request, res: Response) => {
    try {
      const { amount, recipientAccountNumber } = req.body;
      if (!recipientAccountNumber || !amount) {
        return res.status(404).send({ message: 'RecipientAccountNumber and amount are required' })
      }
      const recipient = await userRepository.findOne({ where: { accountNumber: recipientAccountNumber } });
      if (!recipient) return res.status(404).send({ message: "Recipient not found" });
      recipient.balance += amount;
      const received = await userRepository.save(recipient);
      const creditTransaction: TransactionCreationData = {
        transactionType: 'credit',
        senderAccountNumber: '',
        recipientAccountNumber,
        amount,
        date: new Date(),
      }
      const newCreditTransaction = transactionRepository.create(creditTransaction);
      await transactionRepository.save(newCreditTransaction);
      return res.status(200).json({ message: `${recipient.firstName} funded successfully` })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Error", error })
    }
  },

  withdraw: async (req: Request, res: Response) => {
    try {
      const { amount, senderAccountNumber } = req.body;
      const sender = await userRepository.findOne({ where: { accountNumber: senderAccountNumber } });
      if (!senderAccountNumber || !amount) {
        return res.status(404).send({ message: 'SenderAccountNumber and amount are required' })
      }
      if (!sender) return res.status(404).send({ message: "Sender not found" })
      if (sender.balance < amount) return res.status(401).send({ message: 'Insufficient balance, fund account to make transfer or send a lower amount' })
      sender.balance -= amount;
      await sender.userRepository.save();
      const debitTransaction: TransactionCreationData = {
        transactionType: 'debit',
        senderAccountNumber,
        recipientAccountNumber: '',
        amount: - amount,
        date: new Date(),
      }
      const newDebitTransaction = transactionRepository.create(debitTransaction);
      await transactionRepository.save(newDebitTransaction);
      return res.status(200).json({ message: `${sender.firstName} made withdrawal successfully` })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Error", error })
    }
  },

  getAll: async (req: Request, res: Response): Promise<Response> => {
    try {
      const alltransactions = await transactionRepository.find()
      if (!alltransactions || alltransactions == null) {
        return res.status(404).json({ message: 'No transaction records found' })
      }
      return res.status(200).json({ message: 'Got all transactions', alltransactions })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: ' Error occured', error })
    }
  },

  getOne: async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      const transaction = await transactionRepository.findOne({ where: { id } });
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      return res.status(200).json({ message: "Got one!", transaction })
    } catch (error) {
      return res.status(500).json({ message: "Error occured", error })
    }
  },

  delete: async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      const transaction = await transactionRepository.delete({ id });
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      return res.status(200).json({ message: "Transaction deleted!" })
    } catch (error) {
      return res.status(500).json({ message: "Error occured", error })
    }
  }
}

export default transactionController;