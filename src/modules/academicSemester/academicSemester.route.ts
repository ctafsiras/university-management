import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.get('/', AcademicSemesterController.getAcademicSemesters);
router.get('/:id', AcademicSemesterController.getSingleAcademicSemester);
router.delete('/:id', AcademicSemesterController.deleteSingleAcademicSemester);
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterJodSchema),
  AcademicSemesterController.updateSingleAcademicSemester,
);
router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterJodSchema),
  AcademicSemesterController.createAcademicSemester,
);

export const academicSemesterRoutes = router;
