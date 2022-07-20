import * as jwt from 'jsonwebtoken';
import generateJWT from '../utils/generageJWT';
import User from '../database/models/users';
import { ILoginUser } from '../interfaces/users.interface';

// const { JWT_SECRET } = process.env;
const JWT_SECRET = 'jwt_secret';

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

const validateToken = async (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

  return decoded.payload;
};

const userServices = {
  login,
  validateToken,
};

export default userServices;
