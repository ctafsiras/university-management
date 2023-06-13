import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyJodSchema),
  AcademicFacultyController.createAcademicFaculty,
);
router.get('/', AcademicFacultyController.getAcademicFacultys);
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);
router.delete('/:id', AcademicFacultyController.deleteSingleAcademicFaculty);
router.patch('/:id', AcademicFacultyController.updateSingleAcademicFaculty);

export const academicFacultyRoutes = router;
