import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';
const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteSingleStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentJodSchema),
  StudentController.updateSingleStudent,
);

export const StudentRoutes = router;
