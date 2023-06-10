import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonthes,
  academicSemesterTitls,
} from './academicSemister.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitls] as [string, ...string[]], {
      required_error: 'title is required',
    }),

    year: z.number({
      required_error: 'Year is required',
    }),

    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),

    startMonth: z.enum([...academicSemesterMonthes] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),

    endMonth: z.enum([...academicSemesterMonthes] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});

export const AcademicSemesteValidation = {
  createAcademicSemesterZodSchema,
};
