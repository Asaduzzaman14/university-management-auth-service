import { jwtHelpers } from './../../../helpers/jwtHelpers';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.models';
import {
  IChagePassword,
  ILoginUser,
  IRefreshTokenResponse,
  IloginUserResponse,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
// import bcrypt from 'bcrypt';

const loginUser = async (payload: ILoginUser): Promise<IloginUserResponse> => {
  const { id, password } = payload;

  // check

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }

  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_expires_in as string
  );

  // console.log(accessToken, refreshToken, needsPasswordChange);

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token');
  }

  const { userId } = verifiedToken;

  // // user deleted fromd database then have refresh token
  // // checking deleted user
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does not exist');
  }

  // genatate new token

  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );
  console.log(newAccessToken, 'new AccessToken');

  return {
    accessToken: newAccessToken,
  };
};

// const passwordChange = async (
//   user: JwtPayload | null,
//   paylode: IChagePassword
// ): Promise<void> => {
//   const { oldPassword, newPassword } = paylode;

//   // Step 1 -> checking is user exist
//   const isUserExist = await User.isUserExist(user?.userId);
//   console.log(user);

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
//   }

//   //  Step 2 -> checking old password

//   if (
//     isUserExist.password &&
//     !(await User.isPasswordMatch(oldPassword, isUserExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
//   }

//   //  Step 3 -> hash password before save new password

//   const newHashedPassword = await bcrypt.hash(
//     newPassword,
//     Number(config.bycrypt_solt_rounds)
//   );

//   //  Step 4 -> update password

//   const query = { id: user?.userId };
//   const updatedDate = {
//     password: newHashedPassword,
//     needsPasswordChange: false,
//     passwordChangedAt: new Date(),
//   };

//   await User.findOneAndUpdate(query, updatedDate);
// };

const passwordChange = async (
  user: JwtPayload | null,
  paylode: IChagePassword
): Promise<void> => {
  const { oldPassword, newPassword } = paylode;

  // Step 1 -> checking is user exist
  // alternative way to change password

  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );
  console.log(isUserExist, 'this is user');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //  Step 2 -> checking old password

  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  //  Step 3 -> hash password before save new password

  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_solt_rounds)
  // );

  // //  Step 4 -> update password

  // const query = { id: user?.userId };
  // const updatedDate = {
  //   password: newHashedPassword,
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(),
  // };

  // await User.findOneAndUpdate(query, updatedDate);

  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;

  // update password using save method
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  passwordChange,
};
