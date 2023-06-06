import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({ required_error: 'role is Required' }),
  }),
  password: z.string().optional(),
});

// await crreateUserZodSchema.parseAsync(req)

export const UserValidation = {
  createUserZodSchema,
};
