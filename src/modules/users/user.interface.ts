import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculties/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export interface IUser {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
