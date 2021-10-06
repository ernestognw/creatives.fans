import { Schema, model } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const SupportSchema = new Schema(
  {
    description: { type: String, index: true },
    amount: { type: Number, default: 0 },
    fan: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    creative: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

SupportSchema.plugin(mongooseDelete);

export default model('Support', SupportSchema);
