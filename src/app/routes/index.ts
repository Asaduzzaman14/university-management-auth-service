import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/academicSemester/academicSemister.Route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFeaculty.Route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { StudentRoutes } from '../modules/student/studentRoutes';
import { FacultyRoutes } from '../modules/facultyies/faculty.route';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: SemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/management-department',
    route: ManagementDepartmentRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/users/', UserRoutes);
// router.use('/semester/', SemesterRoutes);

export default router;

/* 
simple data :
{
  title:Depertment of computer science
  academicFaculty:8ad9fa33
}

after population
{
  title: depertment of computer science
  academicFaculty::{
    _id:8ad9fa33,
    title: faculty of science and engineering
  }
}



*/
