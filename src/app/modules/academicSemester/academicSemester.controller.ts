import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponst';
import pick from '../../../shared/pick';
import { paginationKeys } from '../../../constants/pagination';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemisterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemisterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester Created Successfully',
      data: result,
    });
    next();
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const paginationOptions = pick(query, paginationKeys);

    console.log(paginationOptions);

    // const result = await AcademicSemesterService.getAllSemesters(
    //   paginationOptions
    // );

    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Semester Retrive Successfully',
    //   data: result,
    // });
    // next();
  }
);

export const AcademicSemesterContriller = {
  createSemester,
  getAllSemesters,
};
