import { User } from './user.models';

export const findLastUserId = async () => {
  const lastuser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastuser?.id;
};

export const genarateUserId = async () => {
  const currentUserId =
    (await findLastUserId()) || (0).toString().padStart(5, '0');
  const incrementalid = (parseInt(currentUserId) + 1)
    .toString()
    .padStart(5, '0');

  return incrementalid;
};
