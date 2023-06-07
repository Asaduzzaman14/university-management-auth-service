import { IAcademicSemister } from './academicSemester.Interface';
import { AcademicSemister } from './academicSemesterModal';

const createSemester = async (paylode: IAcademicSemister) => {
  const result = await AcademicSemister.create(paylode);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
