import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.get('/', AcademicSemesterController.getAcademicSemesters);
router.get('/:id', AcademicSemesterController.getSingleAcademicSemester);
router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.academicSemesterJodSchema),
  AcademicSemesterController.createAcademicSemester,
);

export const academicSemesterRoutes = router;
