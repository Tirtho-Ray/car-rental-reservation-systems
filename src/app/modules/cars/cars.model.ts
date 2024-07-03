import { Schema, model } from 'mongoose';
import { TCars } from './cars.interface';
import { Features } from './cars.constant';

const CarsSchema = new Schema<TCars>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    isElectric: {
      type: Boolean,
      required: true,
    },
    features: {
      type: [String],
      enum: {
        values: Features,
        message: '{VALUE} is not a valid feature',
      },
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
      },
      isDeleted: {
        type: Boolean,
        default: false,
        required: true,
      },
  },
  {
    timestamps: true,
  },
);

export const Cars = model<TCars>('cars', CarsSchema);
