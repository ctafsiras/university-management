import { Model } from 'mongoose';

// export const academicFacultyTitleType: string;

interface IAcademicFaculty {
  title: string;
}

type AcademicFacultyModel = Model<IAcademicFaculty>;

export { AcademicFacultyModel, IAcademicFaculty };
