import config from '../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto increment id
  // const as = {
  //   year: '2020',
  //   code: '02',
  // };
  user.id = await generateFacultyId();
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
