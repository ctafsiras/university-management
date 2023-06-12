import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import ApiError from '../errors/ApiError';
import handleCastError from '../errors/handleCastError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/zodErrorHandler';
import GenericErrorMessage from '../interfaces/error';
import logger from '../shared/logger';
const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log('🚀 globalErrorHandler ', err)
    : logger.error('🚀 globalErrorHandler ', err);

  let message = '';
  let statusCode = 400;
  let errorMessages: GenericErrorMessage[] = [];
  if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = [{ message: err.message, path: '' }];
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
