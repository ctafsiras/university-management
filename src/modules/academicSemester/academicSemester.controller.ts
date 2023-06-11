import { RequestHandler } from 'express';
import { IFilters, IPagination } from '../../interfaces/pagination';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { ...academicSemisterData } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemisterData,
    );
    // res.status(200).json({
    //   success: true,
    //   message: 'Academic Semester created successfully',
    //   data: result,
    // });

    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
    next();
  },
);

const getAcademicSemesters: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters: IFilters = {
      searchTerm: req.query.searchTerm?.toString() || '',
    };
    const paginationOptions: IPagination = pick(req.query);
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
    next();
  },
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
};
