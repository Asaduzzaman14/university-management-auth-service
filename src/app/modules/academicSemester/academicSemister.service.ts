import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAcademicSemister } from './academicSemester.Interface';
import { AcademicSemister } from './academicSemesterModal';
import { academicSemesterTitleCodeMapper } from './academicSemister.constant';
import { IPagenaionOptions } from '../../../interfaces/paginition';
import { IGenericResponse } from '../../../interfaces/common';
import calculatePagination from '../../../helpers/paginationHelper';

const createSemester = async (
  paylode: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (academicSemesterTitleCodeMapper[paylode.title] !== paylode.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code aa');
  }

  const result = await AcademicSemister.create(paylode);
  return result;
};

const getAllSemesters = async (
  pageinationOptions: IPagenaionOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  // const { page = 1, limit = 10 } = pageinationOptions;
  // const skip = (page - 1) * limit;

  const { page, limit, skip } = calculatePagination(pageinationOptions);

  const result = await AcademicSemister.find()
    .sort({ year: 1 })
    .skip(skip)
    .limit(limit);
  // console.log(result);

  const total = await AcademicSemister.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
