import { z } from 'zod';
import { months, code, title } from './academicSemester.constant';

const academicSemesterJodSchema = z.object({
  body: z.object({
    title: z.enum([...title] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.number({
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

export const AcademicSemesterValidation = {
  academicSemesterJodSchema,
};
