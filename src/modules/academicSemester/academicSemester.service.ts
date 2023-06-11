import ApiError from '../../errors/ApiError';
import paginationCalculation from '../../helpers/paginationHelper';
import { IFilters, IPagination } from '../../interfaces/pagination';
import { academicSemesterTitileCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (
  academicSemester: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
  if (
    academicSemesterTitileCodeMapper[academicSemester.title] !==
    academicSemester.code
  ) {
    throw new ApiError(400, 'Code and title does not match');
  }

  const result = await AcademicSemester.create(academicSemester);
  return result;
};

interface IGenericResponse<IAcademicSemester> {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: IAcademicSemester[];
}

const getAcademicSemesters = async (
  paginationOptions: IPagination,
  filters: IFilters,
): Promise<IGenericResponse<IAcademicSemester>> => {
  const { searchTerm } = filters;
  const andCondition = [
    {
      $or: [
        {
          title: {
            $regex: searchTerm,
            $options: 'i',
          },
        },
        {
          code: {
            $regex: searchTerm,
            $options: 'i',
          },
        },
        {
          year: {
            $regex: searchTerm,
          },
        },
      ],
    },
  ];
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
