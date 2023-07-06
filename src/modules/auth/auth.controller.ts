import config from '../../config';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, ...rest } = result;
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginUserResponse>(res, {
    status: 200,
    success: true,
    message: 'User logged in successfully',
    data: rest,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const result = await AuthService.refreshToken(req.cookies.refreshToken);
  sendResponse<IRefreshTokenResponse>(res, {
    status: 200,
    success: true,
    message: 'Token refreshed successfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const user = req.user;
  await AuthService.changePassword(user, passwordData);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Password changed successfully',
    data: null,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
