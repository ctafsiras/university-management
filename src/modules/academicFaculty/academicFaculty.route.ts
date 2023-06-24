import express from 'express';
import { ENUM_USER_ROLE } from '../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.createAcademicFaculty,
);
router.get('/', AcademicFacultyController.getAcademicFacultys);
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);
router.delete('/:id', AcademicFacultyController.deleteSingleAcademicFaculty);
router.patch('/:id', AcademicFacultyController.updateSingleAcademicFaculty);

export const academicFacultyRoutes = router;
