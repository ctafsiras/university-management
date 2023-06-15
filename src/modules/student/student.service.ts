/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import ApiError from '../../errors/ApiError';
import paginationCalculation from '../../helpers/paginationHelper';
import { IFilters, IPagination } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/response';
import { IUser } from '../users/user.interface';
import { User } from '../users/user.model';
import { studentFilterList } from './student.constant';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudent = async (
  paginationOptions: IPagination,
  filters: IFilters,
): Promise<IGenericResponse<IStudent>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: studentFilterList.map((field: string) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationCalculation(paginationOptions);
  const whereCondition = andCondition.length ? { $and: andCondition } : {};
  const result = await Student.find(whereCondition)
    .populate([
      {
        path: 'academicFaculty',
      },
      {
        path: 'academicDepartment',
      },
      {
        path: 'academicSemester',
      },
    ])
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id).populate([
    {
      path: 'AcademicFaculty',
    },
    {
      path: 'AcademicDepartment',
    },
    {
      path: 'AcademicSemester',
    },
  ]);
  return result;
};

const updateSingleStudent = async (
  id: string,
  updatedData: Partial<IStudent>,
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(404, 'Student not found');
  }
  const { name, guardian, localGuardian, ...studentData } = updatedData;
  const newData: Partial<IStudent> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>; // `name.fisrtName`
      (newData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length) {
    Object.keys(guardian).forEach((key) => {
      const newKey = `guardian.${key}` as keyof Partial<IStudent>;
      (newData as any)[newKey] = guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    Object.keys(localGuardian).forEach((key) => {
      const newKey = `localGuardian.${key}` as keyof Partial<IStudent>;
      (newData as any)[newKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, newData, {
    new: true,
  }).populate([
    {
      path: 'academicFaculty',
    },
    {
      path: 'academicDepartment',
    },
    {
      path: 'academicSemester',
    },
  ]);
  return result;
};

const deleteSingleStudent = async (id: string): Promise<IUser | null> => {
  const session = await mongoose.startSession();
  let result;
  try {
    session.startTransaction();
    await Student.findOneAndDelete({
      id,
    });
    result = await User.findOneAndDelete({ id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicSemester',
        },
      ],
    });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return result;
};

export const StudentService = {
  getAllStudent,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
