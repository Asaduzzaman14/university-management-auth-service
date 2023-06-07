import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModal,
  IAcademicSemister,
} from './academicSemester.Interface';
import {
  academicSemesterCodes,
  academicSemesterMonthes,
  academicSemesterTitls,
} from './academicSemister.constant';

const academicSemesterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      require: true,
      enum: academicSemesterTitls,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonthes,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonthes,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemister = model<IAcademicSemister, AcademicSemesterModal>(
  'AcademicSemister',
  academicSemesterSchema
);
