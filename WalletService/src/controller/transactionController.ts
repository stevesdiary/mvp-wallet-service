import { AppDataSource } from "../data-source";
import { Transaction } from "../entity/Transaction";
import { Request, Response } from "express";

const transactionRepository = AppDataSource.getRepository(Transaction);
interface TransactionCreationData {
        email: string;
        transactionType: string;
        amount: number;
        recipientAccountNumber: string;
        senderAccountNumber: string;
      }
const transactionController = {
  create: async (req: Request, res: Response): Promise<Response> => {
    try{
      const { email, senderAccountNumber, transactionType, amount, recipientAccountNumber } = req.body;

      const transaction: TransactionCreationData = {
        email,
        transactionType,
        senderAccountNumber,
        recipientAccountNumber,
        amount,
      }
      const newTransaction = transactionRepository.create(transaction);
      await transactionRepository.save(newTransaction);
      return res.status(201).json({ message: 'Transaction successful', newTransaction})
    } catch (error) {
      console.error(error);
      return res.status(500).send({error})
    }
  },

  getAll: async (req: Request, res: Response): Promise<Response> => {
    try {
      const alltransactions = await transactionRepository.find()
      if (!alltransactions || alltransactions == null){
        return res.status(404).json({ message: 'No transaction records found'})
      }
      return res.status(200).json({message: 'Got all transactions', alltransactions})
    } catch (error) {
      return res.status(500).json({message: ' Error occured', error})
    }
  }
  
  getOne: async (req: Request, res: Response): Promise<Response> => {
    try {
      
    } catch (error) {
      
    }
  }
}

export default transactionController;