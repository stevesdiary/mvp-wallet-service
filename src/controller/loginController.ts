import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from 'bcryptjs';

const userRepository  = AppDataSource.manager.getRepository(User);
const loginController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await userRepository.findOne( email );
      const match = await bcrypt.compare(password, user.password);
      if ( !user ) { 
        return res.status( 200 ).send({message: "User not found"}); 
      }
      if (!match) {
        return res.status(400).send({ message: 'Password is not correct! Enter a valid password'});
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send( {message: 'an error ocurred', error} )
    }
  }
}

export default loginController;
