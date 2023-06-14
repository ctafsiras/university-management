import { Request, RequestHandler, Response } from 'express';

import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { UserService } from './user.service';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response, next) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
    next();
  },
);
export const UserController = {
  createStudent,
};
