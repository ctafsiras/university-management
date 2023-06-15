import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserJodSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyJodSchema),
  UserController.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminJodSchema),
  UserController.createAdmin,
);

export const UserRoutes = router;
