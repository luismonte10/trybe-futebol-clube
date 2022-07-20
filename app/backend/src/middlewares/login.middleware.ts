import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/users';

export const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
};

export const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const user = await User.findOne({ where: { email } });

  if (user) {
    const isCorrect = bcrypt.compare(password, user.password);

    if (!isCorrect) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
  }

  next();
};
