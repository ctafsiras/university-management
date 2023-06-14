import paginationCalculation from '../../helpers/paginationHelper';
import { IFilters, IPagination } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/response';
import { academicDepartmentFilterList } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartment = async (
  academicDepartment: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(academicDepartment)).populate(
    'academicFaculty',
  );
  return result;
};

const getAcademicDepartment = async (
  paginationOptions: IPagination,
  filters: IFilters,
): Promise<IGenericResponse<IAcademicDepartment>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentFilterList.map((field) => ({
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
  const result = await AcademicDepartment.find(whereCondition)
    .populate('AcademicFaculty')
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAcademicDepartment = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'AcademicFaculty',
  );
  return result;
};
const updateSingleAcademicDepartment = async (
  id: string,
  updatedData: Partial<IAcademicDepartment>,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true },
  ).populate('AcademicFaculty');
  return result;
};

const deleteSingleAcademicDepartment = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete({
    _id: id,
  }).populate('AcademicFaculty');
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAcademicDepartment,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
  deleteSingleAcademicDepartment,
};
