/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from '../../interfaces/error';
import config from '../../config';
import handleValidationError from '../../errors/handelValidationError';
import ApiError from '../../errors/ApiError';
import { errorlogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handelZodError from '../../errors/handelZodError';

// global error handler
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
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
  } else if (error instanceof ZodError) {
    const simpliFideError = handelZodError(error);
    statusCode = simpliFideError.statusCode;
    message = simpliFideError.message;
    errorMessages = simpliFideError.errorMessages;
  } else if (error instanceof ApiError) {
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

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
