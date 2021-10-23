import { Schema, model } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const SocialMediaSchema = new Schema({
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  website: { type: String },
});

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      minlength: 5,
    },
    firstName: { type: String, required: true, index: true },
    lastName: { type: String, required: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    profileImg: { type: String },
    description: { type: String },
    social: { type: SocialMediaSchema, default: {} },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(mongooseDelete);

export default model('User', UserSchema);
