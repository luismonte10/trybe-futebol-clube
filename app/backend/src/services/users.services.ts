import * as jwt from 'jsonwebtoken';
import generateJWT from '../utils/generageJWT';
import User from '../database/models/users';
import { ILoginUser } from '../interfaces/users.interface';

const login = async (loginUser: ILoginUser): Promise<string> => {
  const user = await User.findOne({
    where: { email: loginUser.email },
    attributes: { exclude: ['password'] },
  });

  let token = '';

  if (user) {
    token = generateJWT(user);
  }

  return token;
};

const validateToken = async (token: string): Promise<string> => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

  return decoded.payload.role;
};

const userServices = {
  login,
  validateToken,
};

export default userServices;
