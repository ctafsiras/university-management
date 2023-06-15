import { Model, Schema } from 'mongoose';
interface IName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

// export type IStudent = InferSchemaType<typeof studentSchema>;
export interface IAdmin {
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
  managementDepartment: Schema.Types.ObjectId;
}
export type AdminModel = Model<IAdmin, Record<string, unknown>>;
