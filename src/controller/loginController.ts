import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const userRepository  = AppDataSource.manager.getRepository(User);
const loginController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password ) {
        return res.send("Login with registered email and password");
      }
      const user = await userRepository.findOneBy({ email})
      if (!user ) { 
        return res.status( 200 ).send({message: "User not found"}); 
      }
      const validUser = await bcrypt.compare(password, user.password);
      if ( !validUser ) {
        return res.status(401).json({ message: 'Incorrect password'})
      }
      const token = jwt.sign({
        user_id: user.id,
        email: user.email,
        type: user.userType,
      }, process.env.JWT_SECRET as string, {expiresIn: '1h'});
      return res.status(200).send({
        message: "Logged in successfully",
        firstName: user.firstName,
        id: user.id,
        token: token,
      })
    } catch (error) {
      console.log(error);
      return res.status(500).send( {message: 'an error ocurred', error} )
    }
  }
}

export default loginController;