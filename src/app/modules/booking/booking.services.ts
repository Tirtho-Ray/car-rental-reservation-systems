import { User } from '../user/user.model';
import { Booking } from './booking.model';
import { TBooking } from './bookings.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { Cars } from '../cars/cars.model';

interface IDecodedToken {
  id: string;
  role: string;
}
const createUserBookingIntoDB = async (payload: TBooking, token: string) => {
  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET as string) as IDecodedToken;

    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error('User not found');
    }

    // console.log(user);

    // Create the booking with user information
    const bookingData = { ...payload, user: user._id };
    const booking = await Booking.create(bookingData);

    // update status
    await Cars.findByIdAndUpdate(
      payload.carId,
      { status: 'unavailable' }, // Set the status to 'booked' or any appropriate status
      { new: true } // Ensure to get the updated document
    );


    // Populate the user and car data in the booking
    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', '_id name email role phone address') // Include only the specified user fields
      .populate('carId'); // Assuming carId is correctly referenced

    return populatedBooking;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating booking');
  }
};

const getAllBookings = async (query:{ carId?: string; date?: string }) => {
  const filter : any = {};

  if (query.carId) {
    filter.carId = query.carId;
  }

  if (query.date) {
    filter.date = query.date;
  }

  const bookings = await Booking.find(filter)
    .populate('user', '_id name email role phone address')
    .populate('carId');

  return bookings;
};

const getUserBookings = async (userId: string) => {
  const userBookings = await Booking.find({ user: userId })
    .populate('user', '_id name email role phone address')
    .populate('carId');
  // console.log(userBookings);
  return userBookings;
};



// const returnCar = async (_id: string, endTime: string, token: string): Promise<TBooking | null> => {
//   try {
//     // Verify and decode the token to check if the user is an admin
//     const decoded: any = jwt.verify(token, config.JWT_ACCESS_SECRET as string);

//     // Find the booking by ID
//     const booking = await Booking.findById(_id).populate('user', '_id name email role phone address')
//     .populate('carId');
//     // console.log(booking);

//     if (!booking) {
//       throw new Error('Booking not found');
//     }

//     // Check if the decoded user is an admin
//     if (decoded.role !== 'admin') {
//       throw new Error('Unauthorized access');
//     }

//     // Update endTime of the booking
//     booking.endTime = endTime; // This line updates the endTime field

//     // Update status of associated car to "available"
//     const updatedCar = await Cars.findByIdAndUpdate(
//       booking.carId,
//       { status: 'available' },
//       { new: true }
//     );

//     if (!updatedCar) {
//       throw new Error('Car not found');
//     }

//     // Save booking changes including endTime update
//     await booking.save();

//     return booking; // Return the updated booking object
//   } catch (error) {
//     console.error('Error returning car:', error);
//     throw new Error('Error returning car');
//   }
// };


const returnCar = async (_id: string, endTime: string, token: string): Promise<TBooking | null> => {
  try {
    // Verify and decode the token to check if the user is an admin
    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET as string) as IDecodedToken;

    // Find the booking by ID
    const booking = await Booking.findById(_id).populate('user', '_id name email role phone address')
      .populate('carId');
    // console.log(booking);

    if (!booking) {
      throw new Error('Booking not found');
    }

    // Check if the decoded user is an admin
    if (decoded.role !== 'admin') {
      throw new Error('Unauthorized access');
    }

    // Update endTime of the booking
    booking.endTime = endTime; // This line updates the endTime field

    // Convert startTime and endTime to numerical hours
    const startTimeHours = convertTimeToHours(booking.startTime);
    const endTimeHours = convertTimeToHours(endTime);

    // Calculate the duration in hours
    const durationHours = endTimeHours - startTimeHours;

    // Calculate total cost
    const car = await Cars.findById(booking.carId);
    if (!car) {
      throw new Error('Car not found');
    }
    const totalCost = durationHours * car.pricePerHour;

    // Update the booking with the total cost
    booking.totalCost = totalCost;

    // Update status  car to "available"
    const updatedCar = await Cars.findByIdAndUpdate(
      booking.carId,
      { status: 'available' },
      { new: true }
    );

    if (!updatedCar) {
      throw new Error('Car not found');
    }

    // Save booking changes including endTime and totalCost update
    await booking.save();

    return booking; // Return the updated booking object
  } catch (error) {
    // console.error('Error returning car:', error);
    throw new Error('Error returning car');
  }
};

// Helper function to convert time string to hours
const convertTimeToHours = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours + minutes / 60;
};


export const BookingServices = {
  createUserBookingIntoDB,
  getAllBookings,
  getUserBookings,
  returnCar
};
