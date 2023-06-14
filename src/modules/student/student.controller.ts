import { RequestHandler } from 'express';
import { paginationOptionList } from '../../constants/pagination';
import { IFilters, IPagination } from '../../interfaces/pagination';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { studentFilterList } from './student.constant';
import { StudentService } from './student.service';

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const filters: IFilters = pick(req.query, [
    ...studentFilterList,
    'searchTerm',
  ]);
  const paginationOptions: IPagination = pick(req.query, paginationOptionList);
  const result = await StudentService.getAllStudent(paginationOptions, filters);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'All Student fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Student fetched successfully',
    data: result,
  });
});

const updateSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await StudentService.updateSingleStudent(id, updatedData);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

const deleteSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentService.deleteSingleStudent(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
