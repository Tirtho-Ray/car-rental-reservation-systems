import { z } from 'zod';
// Define a reusable time string validation schema
const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // HH:MM in 24-hour format
    return regex.test(time);
  },
  {
    message: 'Invalid time format, expected "HH:MM" in 24 hours format',
  },
);

// Schema for creating a booking
const createBookingValidationSchema = z.object({
  date: z.string(),
  startTime: timeStringSchema,
  endTime: timeStringSchema.optional(),
});

// Schema for updating a booking
export const updateBookingSchema = z.object({
  endTime: timeStringSchema,
});



export const BookingValidation = {
  createBookingValidationSchema,
  updateBookingSchema,
};
