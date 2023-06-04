import { NextFunction, Request, Response } from 'express';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import GenericErrorMessage from '../interfaces/error';
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let message = '';
  let statusCode = 500;
  let errorMessages: GenericErrorMessage[] = [];

  if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [{ message: err.message, path: '' }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? err.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
