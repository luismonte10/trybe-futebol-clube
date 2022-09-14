import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token must be a valid token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (decoded) next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default authToken;
