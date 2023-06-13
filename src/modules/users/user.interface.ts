import { Model } from 'mongoose';
import { IStudent } from '../student/student.interface';

export interface IUser {
  id: string;
  role: string;
  password: string;
  student: IStudent;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
