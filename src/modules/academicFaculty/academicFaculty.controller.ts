import { RequestHandler } from 'express';
import { paginationOptionList } from '../../constants/pagination';
import { IFilters, IPagination } from '../../interfaces/pagination';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { academicFacultyFilterList } from './academicFaculty.constant';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createAcademicFaculty(
    academicFacultyData,
  );
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const getAcademicFacultys: RequestHandler = catchAsync(async (req, res) => {
  const filters: IFilters = pick(req.query, [
    ...academicFacultyFilterList,
    'searchTerm',
  ]);
  const paginationOptions: IPagination = pick(req.query, paginationOptionList);
  const result = await AcademicFacultyService.getAcademicFaculty(
    paginationOptions,
    filters,
  );
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Academic Faculty fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.getSingleAcademicFaculty(id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Academic Faculty fetched successfully',
      data: result,
    });
  },
);
const updateSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicFacultyService.updateSingleAcademicFaculty(
      id,
      updatedData,
    );
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  },
);
const deleteSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.deleteSingleAcademicFaculty(id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Academic Faculty deleted successfully',
      data: result,
    });
  },
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAcademicFacultys,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
  deleteSingleAcademicFaculty,
};
