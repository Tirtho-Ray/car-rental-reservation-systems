import { Schema, model } from 'mongoose';
import { TBooking } from './bookings.interface';

// Define the booking schema
const BookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      default: null
    },
    carId: {
      type: Schema.Types.ObjectId,
      ref: 'cars',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalCost:{
      type:Number,
      default:0
    }

  },
  {
    timestamps: true,
  },
);

// Create the booking model
export const Booking = model('booking', BookingSchema);
