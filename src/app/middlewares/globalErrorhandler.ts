/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { IGenericErrorMessage } from '../../interfaces/error';
import config from '../../config';
import handleValidationError from '../../errors/handelValidationError';
import ApiError from '../../errors/ApiError';
import { errorlogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handelZodError from '../../errors/handelZodError';
import handleCastError from '../../errors/handleCastError';

// global error handler
const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log(`global error handller`, error)
    : errorlogger.error('globalerror handller', error);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name == 'ValidationError') {
    const simplyfideError = handleValidationError(error);
    statusCode = simplyfideError.statusCode;
    message = simplyfideError.message;
    errorMessages = simplyfideError.errorMessages;
  }
  // Zod Error
  else if (error instanceof ZodError) {
    const simpliFideError = handelZodError(error);
    statusCode = simpliFideError.statusCode;
    message = simpliFideError.message;
    errorMessages = simpliFideError.errorMessages;
  }
  // CastError
  else if (error?.name === 'CastError') {
    const simpliFideError = handleCastError(error);
    statusCode = simpliFideError.statusCode;
    message = simpliFideError.message;
    errorMessages = simpliFideError.errorMessages;
  }
  // api Error
  else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  }

  // send error
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
