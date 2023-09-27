import { User } from './user.models';
import { IUser } from './user.interface';
import config from '../../../config';
import {
  genarateStudentId,
  generateAdminId,
  generateFacultyId,
} from './user.utils';
import ApiError from '../../../errors/ApiError';
import { IStudent } from '../student/student.interface';
import { AcademicSemister } from '../academicSemester/academicSemester.modal';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IFaculty } from '../facultyies/faculty.interface';
import { Faculty } from '../facultyies/faculty.model';

import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { RedisClient } from '../../../shared/redis';
import { EVENT_FACULTY_CREATED, EVENT_STUDENT_CREATED } from './user.constant';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  console.log(student, 'student data');
  console.log(user, 'USER data');

  // default password

  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // set role
  user.role = 'student';

  // get a semester for get role and year
  const academicSemester = await AcademicSemister.findById(
    student.academicSemester
  ).lean();

  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // generate student id
    const id = await genarateStudentId(academicSemester);
    user.id = id;
    student.id = id;
    // console.log(user, student, 'user and studend data');

    // array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed To Create Student');
    }

    // set student --> _id into user.student
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed To Create User');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }

  // user --> student --> acadeicSemester, academicDepartrnt, academicFaculty

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    });
  }

  if (newUserAllData) {
    await RedisClient.publish(
      EVENT_STUDENT_CREATED,
      JSON.stringify(newUserAllData.student)
    );
  }

  return newUserAllData;
};

//*************** */
// create student end
//*************** */

// Create Faculty and user

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // set default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // set role
  user.role = 'faculty';

  let newUserAllData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const id = await generateFacultyId();
    user.id = id as string;
    faculty.id = id as string;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faield to create faculty');
    }

    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faield to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  if (newUserAllData) {
    await RedisClient.publish(
      EVENT_FACULTY_CREATED,
      JSON.stringify(newUserAllData.faculty)
    );
  }

  return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  // set role
  user.role = 'admin';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'ManagementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
