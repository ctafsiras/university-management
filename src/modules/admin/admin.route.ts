import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
const router = express.Router();

router.get('/', AdminController.getAllAdmins);
router.get('/:id', AdminController.getSingleAdmin);
router.delete('/:id', AdminController.deleteSingleAdmin);
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateSingleAdmin,
);

export const AdminRoutes = router;
