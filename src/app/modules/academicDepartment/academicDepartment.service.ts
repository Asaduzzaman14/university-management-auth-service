import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helpers/paginationHelper';
import { IPagenaionOptions } from '../../../interfaces/paginition';
import {
  IAcademicDepertment,
  IAcademicDepertmentFilterRequest,
} from './academicDepartment.Interface';
import { AcademicDepartment } from './academicDepartment.Modal';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';
import { IGenericResponse } from '../../../interfaces/common';

const createDepartment = async (
  paylode: IAcademicDepertment
): Promise<IAcademicDepertment> => {
  const result = (await AcademicDepartment.create(paylode)).populate(
    'academicFaculty'
  );
  return result;
};

const getAllDepartment = async (
  filters: IAcademicDepertmentFilterRequest,
  pageinationOptions: IPagenaionOptions
): Promise<IGenericResponse<IAcademicDepertment[]>> => {
  // pagination helpers
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(pageinationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondation = [];

  if (searchTerm) {
    andCondation.push({
      $or: academicDepartmentSearchableFields.map(field => ({
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

  const sortCondations: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondations[sortBy] = sortOrder;
  }
  const requestCondetion =
    andCondation.length > 0 ? { $and: andCondation } : {};

  const result = await AcademicDepartment.find(requestCondetion)
    .populate('academicFaculty')
    .sort(sortCondations)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepertment | null> => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateDepartmentById = async (
  id: string,
  paylode: IAcademicDepertment
): Promise<IAcademicDepertment | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    paylode,
    {
      new: true,
    }
  );
  return result;
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepertment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const AcademicDepartmentServices = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartmentById,
  deleteDepartment,
};
