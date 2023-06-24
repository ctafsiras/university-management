import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/ApiError';
import { JwtHelper } from '../helpers/jwtHelper';

const auth = (...requiredRoles: string[]) =>
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(401, 'Invalid token');
      }
      const verifiedUser = JwtHelper.verifyToken(
        token,
        config.jwt.secret as Secret,
      );
      req.user = verifiedUser;
      if (requiredRoles.length && !requiredRoles.includes(req.user.role)) {
        throw new ApiError(403, 'You are not allowed to access this route');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
