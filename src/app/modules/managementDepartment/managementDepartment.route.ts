import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { ManagementDepartmentValidation } from './managementDepartment.validation';
import { ManagementDepartmentController } from './managementDepartment.controller.ts';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createDepartment
);

router.get('/:id', ManagementDepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateDepartment
);

router.delete('/:id', ManagementDepartmentController.deleteDepartment);

router.get('/', ManagementDepartmentController.getAllDepartments);

export const ManagementDepartmentRoutes = router;
