import express from 'express';
import { AcademicFacultyController } from './academicFeaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty
);
router.get('/:id', AcademicFacultyController.getFacultyById);

router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.updatefacultyZodSchema),
  AcademicFacultyController.updateFacultyById
);

router.delete('/:id', AcademicFacultyController.deleteFaculty);

router.get('/', AcademicFacultyController.getAllFacultys);

export const AcademicFacultyRoutes = router;
