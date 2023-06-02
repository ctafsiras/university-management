import { User } from './user.model';

const findLastId = async () => {
  const lastId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastId?.id;
};

export const generateUserID = async () => {
  const lastId = await findLastId();
  const nextID = lastId ? Number(lastId) + 1 : 1;
  const paddedID = `${nextID}`.padStart(6, '0');
  return paddedID;
};
