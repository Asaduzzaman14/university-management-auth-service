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
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

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
    syncId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Semester is already exist !'
    );
  }
  next();
});

export const AcademicSemister = model<IAcademicSemister, AcademicSemesterModal>(
  'AcademicSemister',
  academicSemesterSchema
);
