import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from "express";
import { Account } from "../entity/Account";
import { error } from "console";

const accountRepository = AppDataSource.getRepository(Account);

const accountController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const accounts =  await accountRepository.find();
      if (!accounts) {
        return res.status(404).send({ message: "Not found"})
      }
      return res.status(200).send({ message: 'Got accounts', data: accounts})
    } catch (error) {
      return res.status(500).json({ message: "Error occured", error} as any);
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const findOneAccount = await accountRepository.findOneBy({ id });
      if (!findOneAccount) { return res.status(404).send({ message: 'Account not found'})}
      return res.status(200).json({ message: "Found One!", data: findOneAccount})
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "An error occurred", error })
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = req.params.id;
      const deleteAccount = await accountRepository.delete( accountId );
      if (deleteAccount) {
        return res.status(200).json({ message: "Deleted successfully", data: null})
      }
      if (!deleteAccount)
        return res.status(404).json({ message: "Account not found", data: null})
      console.log("Cannot delete", error)
      return res.status(400).json({ message: 'Error occured', error} as any)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Error occured', error} as any)
    }
  }
}

export default accountController;