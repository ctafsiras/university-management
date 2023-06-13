import { z } from 'zod';

const createAcademicDepartmentJodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    academicFaculty: z.string({
      required_error: 'academicDepartment is required',
    }),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentJodSchema,
};
