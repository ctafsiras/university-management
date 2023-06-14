/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import ApiError from '../../errors/ApiError';
import paginationCalculation from '../../helpers/paginationHelper';
import { IFilters, IPagination } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/response';
import { IUser } from '../users/user.interface';
import { User } from '../users/user.model';
import { facultyFilterList } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFaculty = async (
  paginationOptions: IPagination,
  filters: IFilters,
): Promise<IGenericResponse<IFaculty>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: facultyFilterList.map((field: string) => ({
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
  const result = await Faculty.find(whereCondition)
    .populate([
      {
        path: 'academicFaculty',
      },
      {
        path: 'academicDepartment',
      },
    ])
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id).populate([
    {
      path: 'academicFaculty',
    },
    {
      path: 'academicDepartment',
    },
  ]);
  return result;
};

const updateSingleFaculty = async (
  id: string,
  updatedData: Partial<IFaculty>,
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });
  if (!isExist) {
    throw new ApiError(404, 'Faculty not found');
  }
  const { name, ...FacultyData } = updatedData;
  const newData: Partial<IFaculty> = { ...FacultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>; // `name.fisrtName`
      (newData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  console.log(newData);
  const result = await Faculty.findOneAndUpdate({ id }, newData, {
    new: true,
  }).populate([
    {
      path: 'academicFaculty',
    },
    {
      path: 'academicDepartment',
    },
  ]);
  return result;
};

const deleteSingleFaculty = async (id: string): Promise<IUser | null> => {
  const session = await mongoose.startSession();
  let result;
  try {
    session.startTransaction();
    await Faculty.findOneAndDelete({
      id,
    });
    result = await User.findOneAndDelete({ id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
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

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
};
