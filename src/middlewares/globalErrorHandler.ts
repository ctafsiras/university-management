import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Error) {
    res.status(400).json({ message: err });
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
  next();
};

export default globalErrorHandler;
