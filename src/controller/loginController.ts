import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import  bcrypt  from 'bcryptjs';
import  jwt from 'jsonwebtoken';
const secret = process.env.SECRETKEY || 'secret_key';
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
      const foundUser = await userRepository.findOne({ where: { email } });
      if (!foundUser){
        return res.send("User profile is not found");
      }
      console.log(password, foundUser.password)
      const isMatch = bcrypt.compareSync(password, foundUser.password);
      if (isMatch){
        const data = {
          email: foundUser.email,
          type: foundUser.userType
        } 
        const token = jwt.sign(data, secret, { expiresIn: '2 days', });
        const user = await userRepository.findOne({ where: { email } });
        return res.status(200).json({ message: `Logged in successfully as ${user?.userType}`, User: user, token: token})
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: `Error happened`, error})
    }
  }
}

export default loginController;