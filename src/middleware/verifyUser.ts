// import { Request, Response, NextFunction } from "express";

// export const verifyUser = (...allowedTypes: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const user = req.header.
//       if (!req.user) {
//         console.error('Unauthorized');
//         return res.status(401).json({ message: 'Unauthorized' });
//       }

//       const userType = req.user.userType;
//       if (allowedTypes.includes(userType)) {
//         next();
//       } else {
//         console.error('Access forbidden: Insufficient rights');
//         return res.status(403).json({ message: 'Access forbidden: Insufficient rights' });
//       }
//     } catch (error) {
//       console.error('An error occurred', error);
//       return res.status(500).json({ message: 'An error occurred', error });
//     }
//   };
// };
