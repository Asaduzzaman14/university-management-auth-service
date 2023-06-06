import { Schema, model } from 'mongoose';
import { IUser, UserModal } from './user.interface';

//  Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
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
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser, UserModal>('User', userSchema);
