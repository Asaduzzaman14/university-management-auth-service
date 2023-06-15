import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  // admin?:Types.ObjectId | IAdmin
  // faculty?:Types.ObjectId | IFaculty
};

export type UserModal = Model<IUser, Record<string, unknown>>;
