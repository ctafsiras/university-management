import { RequestHandler } from 'express';
import { IFilters, IPagination } from '../../interfaces/pagination';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { academicSemesterFilterList } from './academicSemester.constant';
import { AcademicSemesterService } from './academicSemester.service';
import { paginationOptionList } from '../../constants/pagination';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicSemisterData } = req.body;
  const result = await AcademicSemesterService.createAcademicSemester(
    academicSemisterData,
  );

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  });
});

const getAcademicSemesters: RequestHandler = catchAsync(async (req, res) => {
  const filters: IFilters = pick(req.query, [
    ...academicSemesterFilterList,
    'searchTerm',
  ]);
  // const filters: IFilters = {
  //   searchTerm: req.query.searchTerm?.toString() || '',
  // };

  const paginationOptions: IPagination = pick(req.query, paginationOptionList);
  const result = await AcademicSemesterService.getAcademicSemesters(
    paginationOptions,
    filters,
  );
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Academic Semester fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const result = await AcademicSemesterService.getSingleAcademicSemester(id);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Academic Semester fetched successfully',
      data: result,
    });
  },
);
const updateSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicSemesterService.updateSingleAcademicSemester(
      id,
      updatedData,
    );
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Academic Semester updated successfully',
      data: result,
    });
  },
);
const deleteSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const result = await AcademicSemesterService.deleteSingleAcademicSemester(
      id,
    );
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Academic Semester deleted successfully',
      data: result,
    });
  },
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
  deleteSingleAcademicSemester,
};
