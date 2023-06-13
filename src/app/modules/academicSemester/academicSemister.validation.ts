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

    year: z.string({
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

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitls] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),

      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),

      code: z
        .enum([...academicSemesterCodes] as [string, ...string[]])
        .optional(),

      startMonth: z
        .enum([...academicSemesterMonthes] as [string, ...string[]], {
          required_error: 'Start month is required',
        })
        .optional(),

      endMonth: z
        .enum([...academicSemesterMonthes] as [string, ...string[]], {
          required_error: 'End month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );

export const AcademicSemesteValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
