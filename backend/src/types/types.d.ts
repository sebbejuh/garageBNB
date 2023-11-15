import { Document, Types } from 'mongoose';
import { Request, Response } from 'express';

interface User extends Document {
  email: string;
  passwordHash: string;
  _id: Types.ObjectId;
}

interface RequestWithUserData extends Request {
  userData?: {
    _id: Types.ObjectId;
    email: string;
  };
}

interface Listing {
  address: string;
  category: string;
  city: string;
  description: string;
  host: string;
  hostImgURL: string;
  imageURL: string;
  price: number;
  _id: string;
}