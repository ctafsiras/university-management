import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export interface IUser {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
