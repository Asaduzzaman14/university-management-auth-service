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

export type AcademicDepartmentCreatedEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};

export type AcademicDepartmentUpdatedEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};

export type AcademicDepartmentDeletedEvent = {
  id: string;
};
