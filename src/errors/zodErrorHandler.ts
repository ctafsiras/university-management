import { ZodError } from 'zod';
import GenericErrorMessage from '../interfaces/error';
import ErrorResponse from '../interfaces/response';

const handleZodError = (err: ZodError): ErrorResponse => {
  const errorMessages: GenericErrorMessage[] = err.issues.map((issue) => {
    return { message: issue.message, path: issue.path[issue.path.length - 1] };
  });

  return {
    statusCode: 400,
    message: err.message,
    errorMessages: errorMessages,
  };
};

export default handleZodError;
