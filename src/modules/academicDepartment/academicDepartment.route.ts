import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentJodSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);
router.get('/', AcademicDepartmentController.getAcademicDepartments);
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);
router.delete(
  '/:id',
  AcademicDepartmentController.deleteSingleAcademicDepartment,
);
router.patch(
  '/:id',
  AcademicDepartmentController.updateSingleAcademicDepartment,
);

export const academicDepartmentRoutes = router;
