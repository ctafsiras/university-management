import mongoose from 'mongoose';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { Student } from '../student/student.model';

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.defaultStudentPassword as string;
  }
  user.role = 'student';
  const academicSemister = await AcademicSemester.findById(
    student.academicSemester,
  );
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemister);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(400, 'Student cannot be created');
    }

    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(400, 'User cannot be created');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  // newUserAllData=await User.findById(newUserAllData._id).populate('student').populate('faculty').populate('academicSemester');
  return newUserAllData;
};

export const UserService = {
  createStudent,
};
