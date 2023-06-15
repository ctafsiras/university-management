import paginationCalculation from '../../helpers/paginationHelper';
import { IFilters, IPagination } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/response';
import { managementDepartmentFilterList } from './managementDepartment.constant';
import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

const createManagementDepartment = async (
  managementDepartment: IManagementDepartment,
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(managementDepartment);
  return result;
};

const getManagementDepartment = async (
  paginationOptions: IPagination,
  filters: IFilters,
): Promise<IGenericResponse<IManagementDepartment>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: managementDepartmentFilterList.map((field) => ({
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
  const result = await ManagementDepartment.find(whereCondition)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleManagementDepartment = async (
  id: string,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};
const updateSingleManagementDepartment = async (
  id: string,
  updatedData: Partial<IManagementDepartment>,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true },
  );
  return result;
};

const deleteSingleManagementDepartment = async (
  id: string,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete({ _id: id });
  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartment,
  getManagementDepartment,
  getSingleManagementDepartment,
  updateSingleManagementDepartment,
  deleteSingleManagementDepartment,
};
