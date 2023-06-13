import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/academicSemester/academicSemister.Route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFeaculty.Route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/semester',
    route: SemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
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
