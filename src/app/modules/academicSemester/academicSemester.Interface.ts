import { Model } from 'mongoose';

export type IAcademicSemister = {
  title: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
};

export type AcademicSemesterModal = Model<IAcademicSemister>;
