import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { AcademicDepartmentServices } from './academicDepartment.service';
import pick from '../../../shared/pick';
import { paginationKeys } from '../../../constants/pagination';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { IAcademicDepertment } from './academicDepartment.Interface';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  console.log(academicDepartmentData, 'this is data');

  const result = await AcademicDepartmentServices.createDepartment(
    academicDepartmentData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester Created Successfully',
    data: result,
  });
});

//  get All Departments

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const paginationOptions = pick(query, paginationKeys);
  const filters = pick(query, academicDepartmentFilterableFields);

  const result = await AcademicDepartmentServices.getAllDepartment(
    filters,
    paginationOptions
  );
  // console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Departments Retrieved  Succesfully',
    data: result.data,
  });
});
const getDepartmentById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentServices.getSingleDepartment(id);

  sendResponse<IAcademicDepertment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department Retrieved Successfully',
    data: result,
  });
});

// update Department By Id
const updateDepartmentById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicDepartmentServices.updateDepartmentById(
    id,
    updatedData
  );

  sendResponse<IAcademicDepertment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department  successfully updated',
    data: result,
  });
});

// Delete Department
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicDepartmentServices.deleteDepartment(id);

  sendResponse<IAcademicDepertment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty deleted Successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartment,
};
