/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import ApiError from '../../errors/ApiError';
import paginationCalculation from '../../helpers/paginationHelper';
import { IFilters, IPagination } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/response';
import { IUser } from '../users/user.interface';
import { User } from '../users/user.model';
import { adminFilterList } from './admin.constant';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdmin = async (
  paginationOptions: IPagination,
  filters: IFilters,
): Promise<IGenericResponse<IAdmin>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: adminFilterList.map((field: string) => ({
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
  const result = await Admin.find(whereCondition)
    .populate('managementDepartment')
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate('managementDepartment');
  return result;
};

const updateSingleAdmin = async (
  id: string,
  updatedData: Partial<IAdmin>,
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(404, 'Admin not found');
  }
  const { name, ...AdminData } = updatedData;
  const newData: Partial<IAdmin> = { ...AdminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>; // `name.fisrtName`
      (newData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, newData, {
    new: true,
  }).populate('managementDepartment');
  return result;
};

const deleteSingleAdmin = async (id: string): Promise<IUser | null> => {
  const session = await mongoose.startSession();
  let result;
  try {
    session.startTransaction();
    await Admin.findOneAndDelete({
      id,
    });
    result = await User.findOneAndDelete({ id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
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

export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin,
};
