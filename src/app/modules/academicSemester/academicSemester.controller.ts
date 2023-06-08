import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponst';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemisterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemisterData
    );
    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester Created Successfully',
      data: result,
    });
  }
);

export const AcademicSemesterContriller = {
  createSemester,
};
