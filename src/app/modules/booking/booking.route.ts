import express from 'express';
import auth from '../../middleware/auth';
import { user_role } from '../user/user.constant';
import { BookingController } from './booking.controllers';
import catchAsync from '../../utils/catchAsync';
import { validateCreateBooking } from './validateCreateBooking';

const router = express.Router();

router.post('/bookings',catchAsync(validateCreateBooking), auth(user_role.user), BookingController.createUserBooking);

router.get(
  '/bookings',
  auth(user_role.admin), // Only admin can access this route
  BookingController.getAllBookings,
);
router.get(
  '/bookings/my-bookings',
  auth(user_role.user), //only access user only his won booking routes
  BookingController.getUserBookings,
);

// router.put(
//   '/cars/return',
//   auth(user_role.admin), // Ensure only admins can access this route
//   BookingController.returnCar,
// );
router.patch(
  '/cars/return',
  auth(user_role.admin), // Ensure only admins can access this route
  BookingController.returnCar,
);

export const BookingRoutes = router;
