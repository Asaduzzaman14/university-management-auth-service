import { IAcademicSemister } from './academicSemester.Interface';
import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationKeys } from '../../../constants/pagination';
import { academicSemesterFiltareableFields } from './academicSemister.constant';

const createSemester = catchAsync(async (req: Request, res: Response) => {
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
});

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

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicSemesterService.updateSemester(id, updatedData);

  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Retrieved Successfully',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.deleteSemester(id);

  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted Successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSemestersById,
  updateSemester,
  deleteSemester,
};
