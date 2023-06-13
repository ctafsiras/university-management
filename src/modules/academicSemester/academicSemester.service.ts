import ApiError from '../../errors/ApiError';
import paginationCalculation from '../../helpers/paginationHelper';
import { IFilters, IPagination } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/response';
import {
  academicSemesterFilterList,
  academicSemesterTitileCodeMapper,
} from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (
  academicSemester: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (
    academicSemesterTitileCodeMapper[academicSemester.title] !==
    academicSemester.code
  ) {
    throw new ApiError(400, 'Code and title does not match');
  }

  const result = await AcademicSemester.create(academicSemester);
  return result;
};

const getAcademicSemesters = async (
  paginationOptions: IPagination,
  filters: IFilters,
): Promise<IGenericResponse<IAcademicSemester>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterFilterList.map((field) => ({
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
  const result = await AcademicSemester.find(whereCondition)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAcademicSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};
const updateSingleAcademicSemester = async (
  id: string,
  updatedData: Partial<IAcademicSemester>,
): Promise<IAcademicSemester | null> => {
  if (
    updatedData.title &&
    updatedData.code &&
    academicSemesterTitileCodeMapper[updatedData.title] !== updatedData.code
  ) {
    throw new ApiError(400, 'Code and title does not match');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true },
  );
  return result;
};

const deleteSingleAcademicSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete({ _id: id });
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
  deleteSingleAcademicSemester,
};
