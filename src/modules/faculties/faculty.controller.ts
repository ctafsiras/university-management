import { RequestHandler } from 'express';
import { paginationOptionList } from '../../constants/pagination';
import { IFilters, IPagination } from '../../interfaces/pagination';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { facultyFilterList } from './faculty.constant';
import { FacultyService } from './faculty.service';

const getAllFaculties: RequestHandler = catchAsync(async (req, res) => {
  const filters: IFilters = pick(req.query, [
    ...facultyFilterList,
    'searchTerm',
  ]);
  const paginationOptions: IPagination = pick(req.query, paginationOptionList);
  const result = await FacultyService.getAllFaculty(paginationOptions, filters);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'All Faculty fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Faculty fetched successfully',
    data: result,
  });
});

const updateSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await FacultyService.updateSingleFaculty(id, updatedData);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

const deleteSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacultyService.deleteSingleFaculty(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
};
