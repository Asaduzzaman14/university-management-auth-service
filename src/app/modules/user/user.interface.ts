import { Model } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
};

export type UserModal = Model<IUser, Record<string, unknown>>;
