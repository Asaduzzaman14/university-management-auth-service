import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

// interface MyRequest extends Request {
//   user: {
//     role: ENUM_USER_ROLE;
//   };
// }

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, Response: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization;
      // console.log(token, 'this is token');

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      // verified token
      let verifyUser = null;
      try {
        verifyUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
      } catch (error) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Token');
      }

      req.user = verifyUser; // role, userId
      // console.log(verifyUser, '111111');

      if (requiredRoles.length && !requiredRoles.includes(verifyUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
