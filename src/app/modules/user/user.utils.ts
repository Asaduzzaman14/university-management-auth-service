import { IAcademicSemister } from '../academicSemester/academicSemester.Interface';
import { User } from './user.models';

// find last student id
export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

// genarete a incremental id for new student
export const genarateStudentId = async (
  academicSemester: IAcademicSemister | null
): Promise<string> => {
  const currentUserId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let incrementalid = (parseInt(currentUserId) + 1).toString().padStart(5, '0');

  incrementalid = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementalid}`;

  return incrementalid;
};

// find last Faculty Id
const findlastfacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

// genarate a new id for new faculty
export const generateFacultyId = async (): Promise<string | undefined> => {
  const currentId =
    (await findlastfacultyId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
