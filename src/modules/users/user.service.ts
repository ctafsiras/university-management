import config from '../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserID } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto increment id
  user.id = await generateUserID();
  //default student password
  if (!user.password) {
    user.password = config.defaultUserPassword as string;
  }

  const newUser = await User.create(user);
  if (!newUser) {
    throw new Error('User cannot be created');
  }
  return newUser;
};

export const UserService = {
  createUser,
};
