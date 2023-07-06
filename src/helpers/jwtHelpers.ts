import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  paylode: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(paylode, secret, { expiresIn: expireTime });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
