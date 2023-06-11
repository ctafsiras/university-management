import { NextFunction, Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default catchAsync;
