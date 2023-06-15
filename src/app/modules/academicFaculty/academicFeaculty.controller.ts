import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponst';
import { AcademicFacultyService } from './academicFaculty.service';
import { Request, Response } from 'express';
import { IAcademicFaculty } from './academicFaculty.interface';
import pick from '../../../shared/pick';
import { paginationKeys } from '../../../constants/pagination';
import { academicFacultyFilterableFields } from './academicFaculty.constant';

// create faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;

  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created Successfully',
    data: result,
  });
});

// get all faculty
const getAllFacultys = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const paginationOptions = pick(query, paginationKeys);
  const filters = pick(query, academicFacultyFilterableFields);

  const result = await AcademicFacultyService.getAllFacultys(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Retrieved Successfully',
    data: result.data,
    meta: result.meta,
  });
});

// get faculty by id
const getFacultyById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Retrieved Successfully',
    data: result,
  });
});

// update faculty
const updateFacultyById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicFacultyService.updateFacultyById(
    id,
    updatedData
  );

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty  successfully updated',
    data: result,
  });
});

// Delete faculty
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyService.deleteFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty deleted Successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFacultys,
  getFacultyById,
  updateFacultyById,
  deleteFaculty,
};
