import mongoose from 'mongoose';
import GenericErrorMessage from '../interfaces/error';
import ErrorResponse from '../interfaces/response';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): ErrorResponse => {
  const errorMessages: GenericErrorMessage[] = Object.values(err.errors).map(
    (err) => {
      return { message: err.message, path: err.path };
    },
  );

  return {
    statusCode: 400,
    message: err.message,
    errorMessages: errorMessages,
  };
};

export default handleValidationError;
