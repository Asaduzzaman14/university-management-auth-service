import { Model } from 'mongoose';

export type IAcademicSemesterTitles = 'Autum' | 'Summer' | 'Fall';
export type IAcademicSemisterCodes = '01' | '02' | '03';

export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemister = {
  title: IAcademicSemesterTitles;
  year: number;
  code: '01' | '02' | '03';
  startMonth: IAcademicSemesterMonths;
  endMonth: IAcademicSemesterMonths;
  syncId: string;
};

export type AcademicSemesterModal = Model<IAcademicSemister>;

export type IAcademicSemesterFilters = { searchTerm?: string };

export type IAcademicSemesterCreatedEvent = {
  title: string;
  year: number;
  code: string;
  startMonth: IAcademicSemesterMonths;
  endMonth: IAcademicSemesterMonths;
  id: string;
};
