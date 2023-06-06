import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModal,
  IAcademicSemister,
} from './academicSemester.Interface';

const academicSemesterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      require: true,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemister = model<IAcademicSemister, AcademicSemesterModal>(
  ' AcademicSemister',
  academicSemesterSchema
);
