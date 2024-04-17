import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { IRefreshTokenResponse, IloginUserResponse } from './auth.interface';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);

  const { refreshToken } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  // delete result.refreshToken

  sendResponse<IloginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Loggedin successfully',
    data: result,
  });

  // console.log(req.body);
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken, 'my token');

  const result = await AuthService.refreshToken(refreshToken);
  console.log(result, 'refreshToken');

  // set refresh token into cookie
  // const cookieOptions = {
  //   secure: config.env === 'production',
  //   httpOnly: true,
  // };

  // res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Refresh token generated!',
    data: result,
  });

  // console.log(req.body);
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log(user);

  const { ...passwordData } = req.body;

  const result = await AuthService.passwordChange(user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password change successfully',
    data: result,
  });

  // console.log(req.body);
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
