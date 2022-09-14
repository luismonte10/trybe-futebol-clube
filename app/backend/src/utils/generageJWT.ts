import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/users.interface';

const jwtConfig = {
  expiresIn: '24h',
};

const generateJWT = (payload: Omit <IUser, 'password'>) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET as string, jwtConfig);

  return token;
};

export default generateJWT;
