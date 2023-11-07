import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { User } from '../types/types';
import { RequestWithUserData } from '../types/types';
import { Types } from 'mongoose';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const generateToken = (user: User) => {
  if (!secretKey) {
    console.error('SECRET_KEY not defined in environment');
    process.exit(1);
  }

  return jwt.sign({ _id: user._id, email: user.email }, secretKey, { expiresIn: '365d' })
}

export const verifyToken = (req: RequestWithUserData, res: Response, next: NextFunction) => {
  try {
    if (!secretKey) {
      console.error('SECRET_KEY not defined in environment');
      process.exit(1);
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: 'Authorization header missing!'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);

    if (typeof decoded === 'string') {
      return res.status(401).json({
        message: 'Invalid token!'
      });
    }

    req.userData = decoded as { _id: Types.ObjectId; email: string; };
    next()
  } 
  catch {
    return res.status(401).json({
      message: 'Access restricted! Please Login!'
    })
  }
}