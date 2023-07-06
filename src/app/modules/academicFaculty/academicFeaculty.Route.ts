import { ENUM_USER_ROLE } from './../../../enums/uset';
import express from 'express';
import { AcademicFacultyController } from './academicFeaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.createFaculty
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  AcademicFacultyController.getFacultyById
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  validateRequest(academicFacultyValidation.updatefacultyZodSchema),
  AcademicFacultyController.updateFacultyById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.deleteFaculty
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.ADMIN
  ),
  AcademicFacultyController.getAllFacultys
);

export const AcademicFacultyRoutes = router;
