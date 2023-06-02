//generate userid from mongoose model, take last id and increment by 1 and id fixed length 6

import { User } from './user.model';

const findLastId = async () => {
  // Get the last ID in the model.
  const lastId = await User.findOne({}, { id: 1, _id: -1 })
    .sort({ createdAt: -1 })
    .lean();
  return lastId;
};

export const generateUserID = async () => {
  const lastId = await findLastId();
  const nextID = lastId + 1;

  const paddedID = `${nextID}`.padStart(6, '0');

  return paddedID;
};
