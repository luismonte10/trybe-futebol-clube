import { Request, Response, NextFunction } from 'express';

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (email && typeof email === 'string' && email.includes('@') && email.includes('.com')) {
    return next();
  }

  return res.status(400).json({ message: 'All fields must be filled' });
};

export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (password && typeof password !== 'string' && password.length >= 6) {
    return next();
  }

  return res.status(400).json({ message: 'All fields must be filled' });
};
