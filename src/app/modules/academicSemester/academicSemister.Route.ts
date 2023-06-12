import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesteValidation } from './academicSemister.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesteValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

router.get('/:id', AcademicSemesterController.getSemestersById);

router.patch(
  '/:id',
  validateRequest(AcademicSemesteValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

router.delete('/:id', AcademicSemesterController.deleteSemester);

router.get('/', AcademicSemesterController.getAllSemesters);

export const SemesterRoutes = router;
