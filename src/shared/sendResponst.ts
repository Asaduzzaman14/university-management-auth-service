import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  });
};

export default sendResponse;
