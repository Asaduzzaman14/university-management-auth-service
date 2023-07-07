import { Schema, model } from 'mongoose';
import { IUser, UserModal } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

//  Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser, UserModal>(
  {
    id: {
      type: String,
      require: true,
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
    needsPasswordChange: {
      type: Boolean,
      default: true,
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
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<
  IUser,
  'id' | 'role' | 'password' | 'needsPasswordChange'
> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, role: 1, needsPasswordChange: 1, password: 1 }
  );
  return user;
};

userSchema.statics.isPasswordMatch = async function (
  providedPassword: string,
  previewsPass: string
): Promise<boolean> {
  return await bcrypt.compare(providedPassword, previewsPass);
};

// hashing password before save document
// user.create() // user.save()
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_solt_rounds)
  );

  if (!user.needsPasswordChange) {
    user.passwordChangedAt = new Date();
  }
  next();
});

export const User = model<IUser, UserModal>('User', userSchema);

// find user on database for login
// userSchema.methods.isUserExist = async function (
//   id: string
// ): Promise<Partial<IUser | null>> {
//   const user = await User.findOne(
//     { id },
//     { id: 1, needsPasswordChange: 1, password: 1 }
//   );

//   return user;
// };

// check login password and database password
// userSchema.methods.isPasswordMatch = async function (
//   providedPassword: string,
//   previewsPass: string
// ): Promise<boolean> {
//   return await bcrypt.compare(providedPassword, previewsPass);
// };
