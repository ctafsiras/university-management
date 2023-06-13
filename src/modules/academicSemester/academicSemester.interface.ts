import { Model } from 'mongoose';
export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type Code = '01' | '02' | '03';
export type Title = 'Autumn' | 'Summer' | 'Fall';
interface IAcademicSemester {
  title: Title;
  year: string;
  code: Code;
  startMonth: Month;
  endMonth: Month;
}

type AcademicSemesterModel = Model<IAcademicSemester>;

export { AcademicSemesterModel, IAcademicSemester };
