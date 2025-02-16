import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;  
  username: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  googleId?: string;
  displayName?: string;
  profilePic?: string;
}

export interface IUserInput {
  username?: string;
  email?: string;
  password?: string;
  googleId?: string;
  displayName?: string;
  profilePic?: string;
} 