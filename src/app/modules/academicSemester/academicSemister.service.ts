import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IAcademicSemesterFilters,
  IAcademicSemister,
} from './academicSemester.Interface';
import { AcademicSemister } from './academicSemesterModal';
import {
  academicSemesterSearchingFields,
  academicSemesterTitleCodeMapper,
} from './academicSemister.constant';
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
  filters: IAcademicSemesterFilters,
  pageinationOptions: IPagenaionOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondation = [];

  if (searchTerm) {
    andCondation.push({
      $or: academicSemesterSearchingFields.map(field => ({
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

  // const andCondation = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(pageinationOptions);

  const sortCondations: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondations[sortBy] = sortOrder;
  }

  const result = await AcademicSemister.find({ $and: andCondation })
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
