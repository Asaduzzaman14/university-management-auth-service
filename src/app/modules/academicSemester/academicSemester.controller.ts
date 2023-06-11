import { IAcademicSemister } from './academicSemester.Interface';
import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponst';
import pick from '../../../shared/pick';
import { paginationKeys } from '../../../constants/pagination';
import { academicSemesterFiltareableFields } from './academicSemister.constant';

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
    // next();
  }
);

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const paginationOptions = pick(query, paginationKeys);
  const filters = pick(query, academicSemesterFiltareableFields);

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicSemister[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Retrieved Successfully',
    data: result.data,
    meta: result.meta,
  });
  // next();
});

const getSemestersById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);

  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Retrieved Successfully',
    data: result,
  });
});

export const AcademicSemesterContriller = {
  createSemester,
  getAllSemesters,
  getSemestersById,
};
