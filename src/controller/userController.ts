import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import axios, { AxiosError } from "axios";
const blacklistEndPoint: string = process.env.BLACKLIST_API || ''

const userRepository = AppDataSource.manager.getRepository(User);

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
      return res.status(500).send({ message: 'An error occured', error})
    }
  },

  addUserToBlacklist: async ( req: Request, res: Response ) => {
    try{
      const { email } = req.body.email;
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
      const response = await axios.post( blacklistEndPoint, { email });

      if (response.status === 201 || response.status === 200) {
        return res.status(200).json({ message: `${email} successfully added to blacklist` });
      } else {
        return res.status(response.status).json({ message: 'Failed to add email to blacklist', data: response.data });
      }
    } catch(error){
      return res.status(500).send({ message: `Error`, error })
    }
  },

  getBlacklist: async (req: Request, res: Response) => {
    try {
      const response = await axios.get(blacklistEndPoint)
      if ( response.status !== 200 ) {
        return res.status(404).json({ message: `Emails not found or an error occured` });
      } else {
        return res.status(200).json({ message: 'Blacklist emails', data: response });
      }
    } catch (error) {
      return res.status(500).send({message: "Error", AxiosError})
    }
  },

  removeBlacklist: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const numericEmailId = Number(id);
      
      if (!id) {
        return res.status(400).json({ message: 'Email ID is required' });
      }
      
      if (isNaN(numericEmailId)) {
        return res.status(400).json({ message: 'Invalid Email ID' });
      }

      const response = await axios.delete(`${blacklistEndPoint}/${numericEmailId}`);
      
      if (response.status === 200 || response.status === 204) {
        return res.status(200).json({ message: 'Email successfully removed from blacklist' });
      } 
      else {
        return res.status(response.status).json({ message: 'Failed to remove email from blacklist', data: response.data });
      }
      
    } catch (error) {
        // console.error('Unexpected error:', (error as Error).message);
        return res.status(500).json({ message: 'Unexpected error occurred', error: (error as Error).message });
    }
  },

  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { firstName, email, userType, password } = req.body;
      interface UserCreationData {
        firstName: string;
        email: string;
        userType: string;
        password: string;
        accountNumber: string;
      }
      function generateAccountNumber() {
        let accountNumber = '';
        for (let i = 0; i < 10; i++) {
          accountNumber += Math.floor(Math.random() * 10);
        }
        return accountNumber;
      }
      const accountNumber = generateAccountNumber();

      const url = process.env.BLACKLIST_API || "url";
      const response = await fetch(url);
      if(!response.ok) { 
        throw new Error ("Response was not ok. Could not retrieve emails from blacklist")
      }
      const blackList = await response.json();

      const emailList = blackList.map((item: { email: string }) => item.email);
        
      const emailExists = emailList.includes(email);

      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await userRepository.findOne({ where: { email } });
      
      if (existingUser) {
        return res.status(400).json({ message: `User profile already exist for ${email}` })
      }
      if (emailExists) {
        return res.status(400).json({ message: `User ${email} cannot be registered because it is in blackList` })
      }

      const user: UserCreationData = {
        firstName,
        email,
        userType,
        password: hashedPassword,
        accountNumber,
      };

      const newUser = userRepository.create();
      await userRepository.save(newUser);
      return res.status(201).json({ message: 'User created', user })
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong!", error })
    }
  },

  getAll: async (req: Request, res: Response): Promise<Response> => {
    try {
      const allUser = await userRepository.find()
      return res.status(200).json({ message: 'Got users', allUser })
    } catch (error) {
      return res.status(500).json({ message: 'Error occured', error })
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const { firstName, userType, password, email } = req.body;
      const id = req.params.id;
      // function generateRandomAccountNumber() {
      //   let accountNumber = '';
      //   for (let i = 0; i < 10; i++) {
      //     accountNumber += Math.floor(Math.random() * 10);
      //   }
      //   return accountNumber;
      // }
const generatedNumbers = new Set<number>();

function generateUniqueAccountNumber(): number {
  let number: number;
  do {
    // Generate a random 10-digit number
    number = Math.floor(1000000000 + Math.random() * 9000000000);
  } while (generatedNumbers.has(number));
  generatedNumbers.add(number);
  return accountNumber;
}

// Example usage: Generate 10 unique 10-digit numbers
for (let i = 0; i < 10; i++) {
  console.log(generateUniqueAccountNumber());
}
      const accountNumber = generateUniqueAccountNumber();
      const user = await userRepository.findOne({ where: { id } })
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      if (firstName) user.firstName = firstName;
      if (accountNumber) user.accountNumber = accountNumber; 
      if (email) user.email = email;
      if (userType) user.userType = userType;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
      await userRepository.save(user)
      return res.status(200).json({ message: "User data updated", user})
    } catch (error) {
      return res.status(500).json({ message: "Error occured", error })
    }
  },

  deleteUser: async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      const deleteUser = await userRepository.delete({ id });
      if (!deleteUser) { return res.status(404).json({ message: 'User record not deleted, an error must have occured' }) }
      return res.status(200).json({ message: 'User record deleted successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Error occured', error })
    }
  }
};

export default userController;