import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAcademicSemister } from './academicSemester.Interface';
import { AcademicSemister } from './academicSemesterModal';
import { academicSemesterTitleCodeMapper } from './academicSemister.constant';
import { IPagenaionOptions } from '../../../interfaces/paginition';
import { IGenericResponse } from '../../../interfaces/common';
import calculatePagination from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

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
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(pageinationOptions);

  const sortCondations: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondations[sortBy] = sortOrder;
  }

  const result = await AcademicSemister.find()
    .sort(sortCondations)
    .skip(skip)
    .limit(limit);

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
