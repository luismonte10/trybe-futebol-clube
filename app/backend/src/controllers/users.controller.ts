import { Request, Response } from 'express';
import { ILoginUser } from '../interfaces/users.interface';
import userServices from '../services/users.services';

const login = async (req: Request, res: Response) => {
  const loginUser: ILoginUser = req.body;

  const token = await userServices(loginUser);

  return res.status(200).json({ token });
};

export default login;
