import generateJWT from '../utils/generageJWT';
import Users from '../database/models/users';
import { ILoginUser, IUser } from '../interfaces/users.interface';

const login = async (loginUser: ILoginUser) => {
  const [user] = await Users.findAll({ where: { email: loginUser.email } });

  const { password, ...userWithoutPassword } = user as IUser;

  const token = generateJWT(userWithoutPassword);

  return token;
};

export default login;
