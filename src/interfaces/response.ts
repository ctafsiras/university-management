import GenericErrorMessage from './error';

type ErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: GenericErrorMessage[];
  stack?: string;
};

export default ErrorResponse;
