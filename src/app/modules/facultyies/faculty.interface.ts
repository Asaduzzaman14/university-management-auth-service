import { Model, Types } from 'mongoose';
import { IAcademicDepertment } from '../academicDepartment/academicDepartment.Interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type FacultyName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IFaculty = {
  id: string;
  name: FacultyName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  permanentAddress: string;
  presentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  designation: string;
  academicDepartment: Types.ObjectId | IAcademicDepertment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  profileImage?: string;
};

export type FacultyModal = Model<IFaculty>;
