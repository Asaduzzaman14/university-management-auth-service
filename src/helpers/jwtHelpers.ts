import jwt, { Secret } from 'jsonwebtoken';

const createToken = (
  paylode: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(paylode, secret, { expiresIn: expireTime });
};

export const jwtHelpers = {
  createToken,
};
