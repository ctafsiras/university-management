import { Response } from 'express';

interface IApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
  data: T;
}
const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
  const responseData: IApiResponse<T> = {
    status: data.status,
    success: data.success,
    message: data.message || '',
    meta: data.meta,
    data: data.data,
  };
  res.status(data.status).json(responseData);
};
export default sendResponse;
