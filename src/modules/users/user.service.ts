import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto increment id
  //default student password
  const newUser = await User.create(user);
  if (!newUser) {
    throw new Error('User cannot be created');
  }
  return newUser;
};

export default {
  createUser,
};
