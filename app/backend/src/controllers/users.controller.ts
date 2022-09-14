import { Request, Response } from 'express';
import { ILoginUser } from '../interfaces/users.interface';
import userServices from '../services/users.services';

const login = async (req: Request, res: Response) => {
  const loginUser: ILoginUser = req.body;

  const token = await userServices.login(loginUser);

  return res.status(200).json({ token });
};

const validateToken = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Expired or invalid token' });

  const role = await userServices.validateToken(authorization);

  return res.status(200).json({ role });
};

const userController = {
  login,
  validateToken,
};

export default userController;
