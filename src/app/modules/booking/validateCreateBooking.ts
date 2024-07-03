import { Request, Response, NextFunction } from 'express';
import { BookingValidation } from './booking.validation';

const validateCreateBooking = (req: Request, res: Response, next: NextFunction) => {
  const { error } = BookingValidation.createBookingValidationSchema.safeParse(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    next();
  }
};

export { validateCreateBooking };