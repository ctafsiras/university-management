import { RequestHandler } from 'express';
import { paginationOptionList } from '../../constants/pagination';
import { IFilters, IPagination } from '../../interfaces/pagination';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { managementDepartmentFilterList } from './managementDepartment.constant';
import { ManagementDepartmentService } from './managementDepartment.service';

const createManagementDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { ...managementDepartmentData } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartmentData,
    );
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Management Department created successfully',
      data: result,
    });
  },
);

const getManagementDepartments: RequestHandler = catchAsync(
  async (req, res) => {
    const filters: IFilters = pick(req.query, [
      ...managementDepartmentFilterList,
      'searchTerm',
    ]);
    const paginationOptions: IPagination = pick(
      req.query,
      paginationOptionList,
    );
    const result = await ManagementDepartmentService.getManagementDepartment(
      paginationOptions,
      filters,
    );
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Management Department fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSingleManagementDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Management Department fetched successfully',
      data: result,
    });
  },
);
const updateSingleManagementDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result =
      await ManagementDepartmentService.updateSingleManagementDepartment(
        id,
        updatedData,
      );
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Management Department updated successfully',
      data: result,
    });
  },
);
const deleteSingleManagementDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const result =
      await ManagementDepartmentService.deleteSingleManagementDepartment(id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Management Department deleted successfully',
      data: result,
    });
  },
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getManagementDepartments,
  getSingleManagementDepartment,
  updateSingleManagementDepartment,
  deleteSingleManagementDepartment,
};
