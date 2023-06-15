import { z } from 'zod';

const createManagementDepartmentJodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

export const ManagementDepartmentValidation = {
  createManagementDepartmentJodSchema,
};
