import { User } from './user.models';
import { IUser } from './user.interface';
import config from '../../../config';
import { genarateStudentId } from './user.utils';
import ApiError from '../../../errors/ApiError';
import { IStudent } from '../student/student.interface';
import { AcademicSemister } from '../academicSemester/academicSemesterModal';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // console.log(student, 'student data');
  // console.log(user, 'USER data');

  // default password

  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // set role
  user.role = 'student';

  // get a semester for get role and year
  const academicSemester = await AcademicSemister.findById(
    student.academicSemester
  );

  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // generate student id
    const id = await genarateStudentId(academicSemester);
    user.id = id;
    student.id = id;
    console.log(user, student, 'user and studend data');

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

  return newUserAllData;
};

//
export const UserService = {
  createStudent,
};
