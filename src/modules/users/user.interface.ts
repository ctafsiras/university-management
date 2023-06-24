import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { IFaculty } from '../faculties/faculty.interface';
import { IStudent } from '../student/student.interface';

export interface IUser {
  id: string;
  role: string;
  password: string;
  isPasswordChanged: boolean;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
}

// export interface IUserMethods {
//   isExist(id: string): Promise<Partial<IUser | null>>;
//   isPasswordMatched(givenPass: string, savedPass: string): Promise<boolean>;
// }

export interface UserModel extends Model<IUser> {
  isExist(
    id: string,
  ): Promise<Pick<
    IUser,
    'id' | 'password' | 'isPasswordChanged' | 'role'
  > | null>;
  isPasswordMatched(givenPass: string, savedPass: string): Promise<boolean>;
}

// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
