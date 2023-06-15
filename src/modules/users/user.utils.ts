import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastId = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastId?.id ? lastId.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null,
) => {
  const lastId = await findLastStudentId();
  const nextID = lastId ? Number(lastId) + 1 : 1;
  const paddedID = `${nextID}`.padStart(5, '0');
  const studentId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${paddedID}`;
  return studentId;
};

const findLastFacultyId = async () => {
  const lastId = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastId?.id ? lastId.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  const lastId = await findLastFacultyId();
  const nextID = lastId ? Number(lastId) + 1 : 1;
  const paddedID = `${nextID}`.padStart(5, '0');
  const facultyId = `F-${paddedID}`;
  return facultyId;
};
const findLastAdminId = async () => {
  const lastId = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastId?.id ? lastId.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  const lastId = await findLastAdminId();
  const nextID = lastId ? Number(lastId) + 1 : 1;
  const paddedID = `${nextID}`.padStart(5, '0');
  const adminId = `A-${paddedID}`;
  return adminId;
};
