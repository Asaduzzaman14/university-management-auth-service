import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesteValidation } from './academicSemister.validation';
import { AcademicSemesterContriller } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesteValidation.createAcademicSemesterZodSchema),
  AcademicSemesterContriller.createSemester
);

router.get('/:id', AcademicSemesterContriller.getSemestersById);

router.patch(
  '/:id',
  validateRequest(AcademicSemesteValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterContriller.updateSemester
);

router.delete('/:id', AcademicSemesterContriller.deleteSemester);

router.get('/', AcademicSemesterContriller.getAllSemesters);

export const SemesterRoutes = router;
