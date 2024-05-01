import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../utils/types';
import { Response, NextFunction } from 'express';

const prisma = new PrismaClient();
const User = prisma.user;

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const user = await User.findUnique({ where: { id: decode.userId } });

    if (!user) {
      return res.status(401).json({ msg: 'Invalid token, user not found' });
    }

    // Attach the user object to the request for further use
    req.user = user;
    // Call next middleware
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};