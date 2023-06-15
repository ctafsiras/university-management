import { Model, Schema } from 'mongoose';
interface IName {
  firstName: string;
  middleName?: string;
  lastName: string;
}
interface IGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
}
interface ILocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}
// export type IStudent = InferSchemaType<typeof studentSchema>;
export interface IStudent {
  id: string;
  name: IName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  profileImage?: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  academicSemester: Schema.Types.ObjectId;
  academicDepartment: Schema.Types.ObjectId;
  academicFaculty: Schema.Types.ObjectId;
}
export type StudentModel = Model<IStudent, Record<string, unknown>>;
