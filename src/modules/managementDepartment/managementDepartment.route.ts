import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';
const router = express.Router();

router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentJodSchema,
  ),
  ManagementDepartmentController.createManagementDepartment,
);
router.get('/', ManagementDepartmentController.getManagementDepartments);
router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment,
);
router.delete(
  '/:id',
  ManagementDepartmentController.deleteSingleManagementDepartment,
);
router.patch(
  '/:id',
  ManagementDepartmentController.updateSingleManagementDepartment,
);

export const ManagementDepartmentRoutes = router;
