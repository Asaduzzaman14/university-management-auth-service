import { User } from './user.models';
import { IUser } from './user.interface';
import config from '../../../config';
import { genarateStudentId } from './user.utils';
import ApiError from '../../../errors/ApiError';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const semester = {
    code: '01',
    year: '2025',
  };
  // auto genarated incremental id
  const id = await genarateStudentId(semester);
  user.id = id;

  // default password

  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createUser = await User.create(user);
  if (!createUser) {
    throw new ApiError(400, 'Failed to cteate user');
  }
  return createUser;
};

//
export const UserService = {
  createUser,
};
