import GenericErrorMessage from './error';

type ErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: GenericErrorMessage[];
  stack?: string;
};

interface IGenericResponse<IAcademicSemester> {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: IAcademicSemester[];
}

export { ErrorResponse, IGenericResponse };
