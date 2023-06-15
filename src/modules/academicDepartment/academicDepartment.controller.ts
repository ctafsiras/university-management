import { RequestHandler } from 'express';
import { paginationOptionList } from '../../constants/pagination';
import { IFilters, IPagination } from '../../interfaces/pagination';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { academicDepartmentFilterList } from './academicDepartment.constant';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { ...academicDepartmentData } = req.body;
    const result = await AcademicDepartmentService.createAcademicDepartment(
      academicDepartmentData,
    );
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Academic Department created successfully',
      data: result,
    });
  },
);

const getAcademicDepartments: RequestHandler = catchAsync(async (req, res) => {
  const filters: IFilters = pick(req.query, [
    ...academicDepartmentFilterList,
    'searchTerm',
  ]);
  const paginationOptions: IPagination = pick(req.query, paginationOptionList);
  const result = await AcademicDepartmentService.getAcademicDepartment(
    paginationOptions,
    filters,
  );
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Academic Department fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const result = await AcademicDepartmentService.getSingleAcademicDepartment(
      id,
    );
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Academic Department fetched successfully',
      data: result,
    });
  },
);
const updateSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result =
      await AcademicDepartmentService.updateSingleAcademicDepartment(
        id,
        updatedData,
      );
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Academic Department updated successfully',
      data: result,
    });
  },
);
const deleteSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const result =
      await AcademicDepartmentService.deleteSingleAcademicDepartment(id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Academic Department deleted successfully',
      data: result,
    });
  },
);

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartments,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
  deleteSingleAcademicDepartment,
};
