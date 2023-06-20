import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponst';
import httpStatus from 'http-status';

const createStudentController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User and Student Created Successfully',
      data: result,
    });
  }
);

const createFacultyController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    // console.log(req.body, 'this is body');

    const result = await UserService.createFaculty(faculty, userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User and Faculty Created Successfully',
      data: result,
    });
  }
);

export const UserController = {
  createStudentController,
  createFacultyController,
};
