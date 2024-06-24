import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Account } from "../entity/Account";
import bcrypt from "bcryptjs";

const userRepository = AppDataSource.manager.getRepository(User);
const accountRepository = AppDataSource.manager.getRepository(Account)

const userController = {
  getOne: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await userRepository.findOne({ where: { id } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "Got one!", user })
    }
    catch (error) {
      console.log(error);
    }
  },

  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      interface UserCreationData {
        firstName: string;
        email: string;
        userType: string;
        password: string;
        accountNumber: string;
      }
      function generateRandomAccountNumber() {
        let accountNumber = '';
        for (let i = 0; i < 10; i++) {
          accountNumber += Math.floor(Math.random() * 10);
        }
        return accountNumber;
      }
      const accountNumber = generateRandomAccountNumber();
      const { firstName, email, userType, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await userRepository.findOne({ where: { email } })

      console.log('Existing User:', existingUser);
      if (existingUser) {
        return res.status(400).json({ message: `User profile already exist for ${email}` })
      }
      const user: UserCreationData = {
        firstName,
        email,
        userType,
        password: hashedPassword,
        accountNumber,
      };

      const newUser = userRepository.create(user);
      await userRepository.save(newUser);
      // if(!newUser.firstName){ return res.status(400).json({message: 'user not created'})}
      return res.status(201).json({ message: 'User created', user })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Something went wrong!", error })

    }
  },

  getAll: async (req: Request, res: Response): Promise<Response> => {
    try {
      const allUser = await userRepository.find()
      return res.status(200).json({ message: 'Got users', allUser })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Error occured', error })
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const { firstName, userType, password } = req.body;
      const id = req.params.id;
      function generateRandomAccountNumber() {
        let accountNumber = '';
        for (let i = 0; i < 10; i++) {
          accountNumber += Math.floor(Math.random() * 10);
        }
        return accountNumber;
      }
      const accountNumber = generateRandomAccountNumber();
      const user = await userRepository.findOne({ where: { id } })
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      if (firstName) user.firstName = firstName;
      if (accountNumber) user.accountNumber = accountNumber; 
      if (userType) user.userType = userType;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
      await userRepository.save(user)
      return res.status(200).json({ message: "User data updated", user})
    } catch (error) {
      console.log("Error occured", error)
      return res.status(500).json({ message: "Error occured", error })
    }
  },

  deleteUser: async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      const deleteUser = await userRepository.delete({ id });
      if (!deleteUser) { return res.status(404).json({ message: 'Record not deleted' }) }
      return res.status(200).json({ message: 'Record deleted successfully' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Error occured', error })
    }
  }
};


export default userController;