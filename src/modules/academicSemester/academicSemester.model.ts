import { Schema, model } from 'mongoose';
import ApiError from '../../errors/ApiError';
import { code, months, title } from './academicSemester.constant';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

const academicSemesterShema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: title,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: code,
    },
    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  { timestamps: true },
);

// academicSemesterShema.index({ title: 1, year: 1 }, { unique: true });
academicSemesterShema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(409, 'Academic Semester already exist');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterShema,
);
