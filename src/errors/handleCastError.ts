import mongoose from 'mongoose';
import GenericErrorMessage from '../interfaces/error';
import ErrorResponse from '../interfaces/response';

const handleCastError = (err: mongoose.Error.CastError): ErrorResponse => {
  const errorMessages: GenericErrorMessage[] = [
    {
      path: err.path,
      message: 'Invalid id',
    },
  ];

  return {
    statusCode: 400,
    message: 'Cast Error',
    errorMessages: errorMessages,
  };
};

export default handleCastError;
