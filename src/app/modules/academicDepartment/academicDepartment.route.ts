import express from 'express';
import { academicDepartmentController } from './academicDeparment.Controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  academicDepartmentController.createDepartment
);

router.get('/:id', academicDepartmentController.getDepartmentById);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  academicDepartmentController.updateDepartmentById
);

router.delete('/:id', academicDepartmentController.deleteDepartment);

router.get('/', academicDepartmentController.getAllDepartment);

export const AcademicDepartmentRoutes = router;
