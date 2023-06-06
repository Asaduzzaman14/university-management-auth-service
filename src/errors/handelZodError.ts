import { ZodError, ZodIssue } from 'zod';
import { IGenericResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handelZodError = (error: ZodError): IGenericResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod validation Error',
    errorMessages: errors,
  };
};

export default handelZodError;
