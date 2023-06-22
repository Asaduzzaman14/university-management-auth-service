import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../facultyies/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser | null>>;

//   isPasswordMatch(
//     providedPassword: string,
//     currentPassword: string
//   ): Promise<boolean>;
// };

// export type UserModal = Model<IUser, Record<string, unknown>, IUserMethods>;

export type UserModal = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'role' | 'password' | 'needsPasswordChange'>>;

  isPasswordMatch(
    providedPassword: string,
    currentPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
