import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { ENUM_USER_ROLE } from '../../../enums/uset';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createStudentController
);

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFacultyController
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);
export const UserRoutes = router;

/* 
{
    "password": "123456",     

    "student": {
        "name": {
            "firstName": "Md",
            "lastName": "Asad",
            "middleName": "Asaduzzaman"
        },
        "dateOfBirth": "24-04-1998",
        "gender": "male",
        "bloodGroup": "O+",
        "email": "user@gmail.com",
        "contactNo": "user_4",
        "emergencyContactNo": "01600000000",
        "presentAddress": "CTG",
        "permanentAddress": "CTG",
        "academicFaculty": "64884b7c535d05e34eb960fa",
        "academicDepartment": "64884d3e081cf4d1cb809c1a",
        "academicSemester": "6486f13e0f1c05983eddd185",
        "guardian": {
            "fatherName": "MD.ABBU",
            "fatherOccupation": "Retired Teacher",
            "fatherContactNo": "01600000000",
            "motherName": "Mrs.Ammu",
            "motherOccupation": "Housewife",
            "motherContactNo": "01600000000",
            "address": "CTG"
        },
        "localGuardian": {
            "name": "Zahid Hasan",
            "occupation": "Service Holder",
            "contactNo": "01600000000",
            "address": "Dhaka"
        }

      }
}

*/
