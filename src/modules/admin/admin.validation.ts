import { z } from 'zod';

const updateAdminJodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string({}).optional(),
        middleName: z.string().optional(),
        lastName: z.string({}).optional(),
      })
      .optional(),
    gender: z.enum(['male', 'female']).optional(),
    dateOfBirth: z.string({}).optional(),
    email: z.string({}).email().optional(),
    contactNo: z.string({}).optional(),
    emergencyContactNo: z.string({}).optional(),
    designation: z.string({}).optional(),
    presentAddress: z.string({}).optional(),
    permanentAddress: z.string({}).optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
      .optional(),
    profileImage: z.string({}).optional().optional(),
    managementDepartment: z.string({}).optional(),
  }),
});

export const AdminValidation = {
  updateAdminJodSchema,
};
//   await createUserJodSchema.parseAsync(req);
