import { z } from 'zod';
import { bloodGroup } from '../student/student.costant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is Required',
      }),
      middleName: z.string({
        required_error: 'First name is Required',
      }),
      lastName: z.string({
        required_error: 'First name is Required',
      }),
    }),

    dateOfBirth: z.string({
      required_error: 'Date of birth is Required',
    }),
    gender: z.enum(['male', 'female'], {
      required_error: 'gender is Required',
    }),
    bloodGoup: z.enum(['', ''], {
      required_error: 'bloodGoup is Required',
    }),
    email: z
      .string({
        required_error: 'gender is Required',
      })
      .email(),
    contactNo: z.string({
      required_error: 'Contact number is required',
    }),
    emergencyContactNo: z.string({
      required_error: 'Emergency contact number is required',
    }),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    presentAddress: z.string({
      required_error: 'Present address is required',
    }),
    permanentAddress: z.string({
      required_error: 'Permanent address is required',
    }),
    academicSemester: z.string({
      required_error: 'Academic semester is required',
    }),
    academicDepartment: z.string({
      required_error: 'Academic department is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic faculty is required',
    }),
    guardian: z.object({
      fatherName: z.string({
        required_error: 'Father name is required',
      }),
      fatherOccupation: z.string({
        required_error: 'Father occupation is required',
      }),
      fatherContactNo: z.string({
        required_error: 'Father contact number is required',
      }),

      motherName: z.string({
        required_error: 'Mother name is required',
      }),

      motherOccupation: z.string({
        required_error: 'Mother occupation is required',
      }),
      motherContactNo: z.string({
        required_error: 'Mother contact number is required',
      }),
      address: z.string({
        required_error: 'Guardian address is required',
      }),
    }),

    localGuardian: z.object({
      name: z.string({
        required_error: 'Local guardian name is required',
      }),
      occupation: z.string({
        required_error: 'Local guardian occupation is required',
      }),
      contactNo: z.string({
        required_error: 'Local guardian contact number is required',
      }),
      address: z.string({
        required_error: 'Local guardian address is required',
      }),
    }),
    profileImage: z.string().optional(),
  }),
});

// await crreateUserZodSchema.parseAsync(req)

export const UserValidation = {
  createUserZodSchema,
};
