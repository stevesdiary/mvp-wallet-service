import { Response, Request, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
const secret: string = process.env.SECRETKEY || "Secret_key"

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const header = req.headers['authorization']
      let token = req.headers.authorization ;
      token = header?.split(' ')[1] || 'string';
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
      if(token == null || !token) {
        return res.status(403).json({message: 'Invalid or expired token'})
      }
      next();
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Error occured', error})
    }
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const verifyUser = (...allowedType:string[]) => {
        const header = req.headers['authorization'];
      let token: string = req.headers.authorization || '';
      token = header?.split(' ')[1] || 'STRING';

      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
      const decoded = jwt.verify(token, secret)as jwt.JwtPayload;
      
      let userType = decoded.userType;
      // console.log("User", userType);
      if (allowedType.includes(userType)) {
        next();
      }
      else {
        return res.status(403).json({ message: 'Access denied: Insufficient rights' });
      }
    }
    } catch (error) {
      return res.status(500).json({message: 'An error occurred', error})
    }
  }
