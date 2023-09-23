import { Schema, model } from 'mongoose';
import {
  AcademicDepartmentModal,
  IAcademicDepertment,
} from './academicDepartment.Interface';

const AcademicDepartmentSchema = new Schema<
  IAcademicDepertment,
  AcademicDepartmentModal
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    syncId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicDepartment = model<
  IAcademicDepertment,
  AcademicDepartmentModal
>('AcademicDepartment', AcademicDepartmentSchema);
