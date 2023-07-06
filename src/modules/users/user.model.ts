import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    isPasswordChanged: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

userSchema.statics.isExist = async function (
  id: string,
): Promise<Pick<
  IUser,
  'id' | 'password' | 'isPasswordChanged' | 'role'
> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, isPasswordChanged: 1, role: 1 },
  );
};
userSchema.statics.isPasswordMatched = async function (
  givenPass: string,
  savedPass: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPass, savedPass);
};
// userSchema.methods.isExist = async function (
//   id: string,
// ): Promise<Partial<IUser | null>> {
//   return await User.findOne(
//     { id },
//     { id: 1, password: 1, isPasswordChanged: 1 },
//   );
// };
// userSchema.methods.isPasswordMatched = async function (
//   givenPass: string,
//   savedPass: string,
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPass, savedPass);
// };
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcryptSalt));
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
