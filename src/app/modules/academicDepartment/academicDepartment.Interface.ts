import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IAcademicDepertment = {
  title: string;

  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type AcademicDepartmentModal = Model<IAcademicDepertment, object>;

export type IAcademicDepertmentFilterRequest = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};
