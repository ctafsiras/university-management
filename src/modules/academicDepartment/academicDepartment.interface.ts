import mongoose, { Model } from 'mongoose';

interface IAcademicDepartment {
  title: string;
  academicFaculty: string | mongoose.Types.ObjectId;
}

type AcademicDepartmentModel = Model<IAcademicDepartment>;

export { AcademicDepartmentModel, IAcademicDepartment };
