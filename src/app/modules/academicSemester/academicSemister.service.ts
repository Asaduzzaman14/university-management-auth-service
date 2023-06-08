import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAcademicSemister } from './academicSemester.Interface';
import { AcademicSemister } from './academicSemesterModal';
import { academicSemesterTitleCodeMapper } from './academicSemister.constant';

const createSemester = async (
  paylode: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (academicSemesterTitleCodeMapper[paylode.title] !== paylode.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code aa');
  }

  const result = await AcademicSemister.create(paylode);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
