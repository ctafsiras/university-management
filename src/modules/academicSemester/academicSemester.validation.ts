import { z } from 'zod';
import { code, months, title } from './academicSemester.constant';

const createAcademicSemesterJodSchema = z.object({
  body: z.object({
    title: z.enum([...title] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.string({
      required_error: 'year is required',
    }),
    code: z.enum([...code] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...months] as [string, ...string[]], {
      required_error: 'startMonth is required',
    }),
    endMonth: z.enum([...months] as [string, ...string[]], {
      required_error: 'endMonth is required',
    }),
  }),
});
const updateAcademicSemesterJodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...title] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'year is required',
        })
        .optional(),
      code: z
        .enum([...code] as [string, ...string[]], {
          required_error: 'code is required',
        })
        .optional(),
      startMonth: z
        .enum([...months] as [string, ...string[]], {
          required_error: 'startMonth is required',
        })
        .optional(),
      endMonth: z
        .enum([...months] as [string, ...string[]], {
          required_error: 'endMonth is required',
        })
        .optional(),
    }),
  })
  .refine(
    (data) =>
      (data.body.code && data.body.title) ||
      (!data.body.code && !data.body.title),
    { message: 'code and title both are required or both are not required' },
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterJodSchema,
  updateAcademicSemesterJodSchema,
};
