import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepository  = AppDataSource.manager.getRepository(User);
const loginController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await userRepository.findOne( email );
      if ( !user ) { 
        return res.status( 200 ).send({message: "User not found"}); 
      }
      
    } catch (error) {
      return res.status(500).send( {message: 'an error ocurred', error} )
    }
  }
  

}

export default loginController;