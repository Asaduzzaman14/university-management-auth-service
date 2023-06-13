import express from 'express';
import { academicDepartmentController } from './academicDeparment.Controller';

const router = express.Router();

router.post(
  '/create-department',
  academicDepartmentController.createDepartment
);

router.get('/:id', academicDepartmentController.getDepartmentById);

// router.patch('/:id', academicFacultyController.updateFacultyById);

router.get('/', academicDepartmentController.getAllDepartment);

export const AcademicDepartmentRoutes = router;
