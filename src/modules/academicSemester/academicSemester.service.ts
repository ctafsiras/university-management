import ApiError from '../../errors/ApiError';
import paginationCalculation from '../../helpers/paginationHelper';
import { IFilters, IPagination } from '../../interfaces/pagination';
import {
  academicSemesterFilterList,
  academicSemesterTitileCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IGenericResponse,
} from './academicSemester.interface';
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
  const result = await AcademicSemester.find({ $and: andCondition })
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

export const AcademicSemesterService = {
  createAcademicSemester,
  getAcademicSemesters,
};
