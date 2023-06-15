import { Request, RequestHandler, Response } from 'express';

import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { UserService } from './user.service';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  },
);
const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await UserService.createFaculty(faculty, userData);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Faculty created successfully',
      data: result,
    });
  },
);
const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Admin created successfully',
      data: result,
    });
  },
);
export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
