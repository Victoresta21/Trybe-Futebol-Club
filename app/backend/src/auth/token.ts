import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import User from '../database/models/user';

const JWT_SECRET = readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' }) || 'super_senha';

const generateToken = (email: string, password: string): { token : string } => {
  const jwtConfig = { expiresIn: '1d' };
  const token = jwt.sign({ email, password }, JWT_SECRET, jwtConfig);
  return ({ token });
};

const checkToken = async (authorization: string) => {
  const verifyToken = jwt.verify(authorization, JWT_SECRET) as jwt.JwtPayload;
  const userEmailFound = await User.findOne({ where: { email: verifyToken.email } });
  if (!userEmailFound) return false;
  const { role } = userEmailFound;
  if (role) return role;
  return false;
};

export default {
  generateToken,
  checkToken,
};
