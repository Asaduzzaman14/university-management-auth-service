import express from 'express';
import { academicFacultyController } from './academicFeaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.createFacultyZodSchema),
  academicFacultyController.createFaculty
);
router.get('/:id', academicFacultyController.getFacultyById);

router.get('/', academicFacultyController.getFacultyById);

export const AcademicFacultyRoutes = router;
