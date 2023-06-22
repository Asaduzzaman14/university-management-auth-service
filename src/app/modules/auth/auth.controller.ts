import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { IloginUserResponse } from './auth.interface';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { refreshToken, ...others } = result;
  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'prouction',
    httpOnly: true,
  };
  res.cookie('refreshToken', result.refreshToken, cookieOptions);

  // delete result.refreshToken

  sendResponse<IloginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Loggedin successfully',
    data: others,
  });

  // console.log(req.body);
});

export const AuthController = {
  loginUser,
};
