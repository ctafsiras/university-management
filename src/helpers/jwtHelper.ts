import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expiresIn: string,
) => jwt.sign(payload, secret, { expiresIn });

const verifyToken = (token: string, secret: Secret): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload;

export const JwtHelper = {
  createToken,
  verifyToken,
};
