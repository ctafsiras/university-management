import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { JwtHelper } from '../../helpers/jwtHelper';
import { User } from '../users/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  const isUserExist = await User.isExist(id);
  if (!isUserExist) {
    throw new ApiError(404, 'User not found');
  }

  if (
    isUserExist?.password &&
    !User.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(400, 'Password is incorrect');
  }

  const { role, isPasswordChanged } = isUserExist;
  const accessToken = JwtHelper.createToken(
    { id: isUserExist.id, role },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string,
  );
  const refreshToken = JwtHelper.createToken(
    { id: isUserExist.id, role },
    config.jwt.refreshSecret as Secret,
    config.jwt.refreshExpiresIn as string,
  );
  return {
    accessToken,
    refreshToken,
    isPasswordChanged,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifyToken = null;
  try {
    verifyToken = JwtHelper.verifyToken(
      token,
      config.jwt.refreshSecret as Secret,
    );
    if (!verifyToken) {
      throw new ApiError(401, 'Invalid token');
    }
  } catch (e) {
    throw new ApiError(401, 'Invalid token');
  }

  const { userId, role } = verifyToken as { userId: string; role: string };
  const isUserExist = await User.isExist(userId);
  if (!isUserExist) {
    throw new ApiError(401, 'Invalid User');
  }
  const accessToken = JwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string,
  );
  return { accessToken };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
