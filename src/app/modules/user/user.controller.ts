import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponst';
import httpStatus from 'http-status';

const createUserController: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);

    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
  }
);

export const UserController = {
  createUserController,
};
