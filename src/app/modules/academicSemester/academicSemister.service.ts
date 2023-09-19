import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IAcademicSemesterCreatedEvent,
  IAcademicSemesterFilters,
  IAcademicSemister,
} from './academicSemester.Interface';
import { AcademicSemister } from './academicSemester.modal';
import {
  academicSemesterSearchingFields,
  academicSemesterTitleCodeMapper,
} from './academicSemister.constant';
import { IPagenaionOptions } from '../../../interfaces/paginition';
import { IGenericResponse } from '../../../interfaces/common';
import calculatePagination from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

// Create semester service
const createSemester = async (
  paylode: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (academicSemesterTitleCodeMapper[paylode.title] !== paylode.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code aa');
  }

  const result = await AcademicSemister.create(paylode);
  return result;
};

// Get All Semester Services
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
  const requestCondetion =
    andCondation.length > 0 ? { $and: andCondation } : {};

  const result = await AcademicSemister.find(requestCondetion)
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

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemister.findById(id);
  return result;
};

const updateSemester = async (
  id: string,
  paylode: Partial<IAcademicSemister>
): Promise<IAcademicSemister | null> => {
  if (
    paylode.code &&
    paylode.title &&
    academicSemesterTitleCodeMapper[paylode.title] !== paylode.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code aa');
  }
  const result = await AcademicSemister.findOneAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteSemester = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemister.findByIdAndDelete(id);
  return result;
};

// Create semester service
const createSemesterFromEvent = async (
  e: IAcademicSemesterCreatedEvent
): Promise<void> => {
  await AcademicSemister.create({
    title: e.title,
    year: e.year,
    code: e.code,
    startMonth: e.startMonth,
    endMonth: e.endMonth,
    syncId: e.id,
  });
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
  createSemesterFromEvent,
};
