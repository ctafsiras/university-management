import { Request, RequestHandler, Response } from 'express';

import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next) => {
    const user = req.body;
    const result = await UserService.createUser(user);
    // res.status(200).json({
    //   success: true,
    //   message: 'user created successfully',
    //   data: newUser,
    // });
    sendResponse(res, {
      status: 200,
      success: true,
      message: 'User created successfully',
      data: result,
    });
    next();
  },
);
export const UserController = {
  createUser,
};
