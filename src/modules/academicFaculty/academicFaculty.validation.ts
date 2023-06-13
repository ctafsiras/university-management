import { z } from 'zod';

const createAcademicFacultyJodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyJodSchema,
};
