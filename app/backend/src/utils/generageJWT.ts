import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/users.interface';

const JWT_SECRET = 'jwt_secret';

const jwtConfig = {
  expiresIn: '24h',
};

const generateJWT = (payload: Omit <IUser, 'password'>) => {
  const token = jwt.sign({ payload }, JWT_SECRET, jwtConfig);

  return token;
};

export default generateJWT;
