import { NextFunction, Request, Response } from 'express';
import auth from '../auth/token';

const validateToken = async (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || authorization === 'null') {
    return { status: 401, error: { message: 'empty authorization' } };
  }
  const isValid = await auth.checkToken(authorization);
  if (!isValid) {
    return { status: 400, error: { message: 'Jwt Check Error' } };
  }
  next();
};

export default validateToken;
