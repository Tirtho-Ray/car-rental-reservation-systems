import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { user_role, user_status } from './user.constant';
import bcryptjs from 'bcryptjs';
import config from '../../config';

const UserSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      
    },
    role: {
      type: Schema.Types.String,
      required: [true, 'Role is required'],
      enum: Object.values(user_role),
      default: user_role.user,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      required: [true, 'Status is required'],
      enum: Object.values(user_status),
      default: user_status.active,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  this.password = await bcryptjs.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );

  next();
});
UserSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

export const User = model<TUser>('User', UserSchema);
