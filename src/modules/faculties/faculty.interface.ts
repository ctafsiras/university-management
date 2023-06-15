import { Model, Schema } from 'mongoose';
interface IName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

// export type IStudent = InferSchemaType<typeof studentSchema>;
export interface IFaculty {
  id: string;
  name: IName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  profileImage?: string;
  designation: string;
  academicDepartment: Schema.Types.ObjectId;
  academicFaculty: Schema.Types.ObjectId;
}
export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
