import { IPagenaionOptions } from '../../../interfaces/paginition';
import { IGenericResponse } from '../../../interfaces/common';
import calculatePagination from '../../../helpers/paginationHelper';
import mongoose, { SortOrder } from 'mongoose';
import { IStudent, IStudentsFilters } from './student.interface';
import {
  EVENT_STUDENT_UPDATED,
  studentSearchingFields,
} from './student.costant';
import { Student } from './student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../user/user.models';
import { RedisClient } from '../../../shared/redis';

// Get All Student Services
const getAllStudents = async (
  filters: IStudentsFilters,
  pageinationOptions: IPagenaionOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondation = [];

  if (searchTerm) {
    andCondation.push({
      $or: studentSearchingFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondation.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(pageinationOptions);

  const sortCondations: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondations[sortBy] = sortOrder;
  }
  const requestCondetion =
    andCondation.length > 0 ? { $and: andCondation } : {};

  const result = await Student.find(requestCondetion)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortCondations)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(requestCondetion);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

/* 
  get student By id service
*/
const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id);
  return result;
};

/* 
UPDATE STUDENT BY ID
*/

const updateStudent = async (
  id: string,
  paylode: Partial<IStudent>
): Promise<IStudent | null> => {
  const studentIsExist = await Student.findOne({ id });
  if (!studentIsExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Studet not found');
  }

  const { name, guardian, localGuardian, ...studentData } = paylode;

  const updatedStudentData: Partial<IStudent> = { ...studentData };

  /* 
const name = {
  FirstName:"md"
  lastName:"asad"
}
*/
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`; // name.firstName // name.lastName

      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`; // name.firstName // name.lastName

      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof name];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGurdianKey = `localGuardian.${key}`; // name.firstName // name.lastName

      (updatedStudentData as any)[localGurdianKey] =
        localGuardian[key as keyof typeof name];
    });
  }

  const result = await Student.findOneAndUpdate(
    { id: id },
    updatedStudentData,
    {
      new: true,
    }
  );
  if (result) {
    await RedisClient.publish(EVENT_STUDENT_UPDATED, JSON.stringify(result));
  }
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete student first
    const student = await Student.findOneAndDelete({ id }, { session });
    if (!student) {
      throw new ApiError(404, 'Failed to delete student');
    }
    //delete user
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return student;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
