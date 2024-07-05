import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.services";

const createUserBooking = catchAsync(async (req, res) => {
    // Extract token from request headers
    const token = req.headers.authorization?.split(' ')[1]; // Assuming 'Bearer <token>'
    if (!token) {
        return sendResponse(res, {
            statusCode: httpStatus.UNAUTHORIZED,
            success: false,
            message: "Authorization token not provided",
        });
    }
    // console.log("ser:",token);

    const result = await BookingServices.createUserBookingIntoDB(req.body, token);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking is book successfully",
        data: result
    });
});



const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookings(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookings retrieved successfully',
      data: result,
    });
  });
  
 
const getUserBookings = catchAsync(async (req ,res) => {
    const userId = req.user?._id;
    // console.log(`User Id: ${userId}`);
  
    if (!userId) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'User not authenticated',
      });
    }
  
    const userBookings = await BookingServices.getUserBookings(userId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'My Bookings retrieved successfully',
      data: userBookings,
    });
    // console.log(`user booking:${userBookings}`);
  });

  // const returnCar =catchAsync( async (req, res) => {
  //   const { bookingId, endTime } = req.body;
  //   const token = req.headers.authorization?.split(' ')[1]; // Assuming 'Bearer <token>'
  
 
  //     const updatedBooking = await BookingServices.returnCar(bookingId, endTime, token as string);
  
  //     res.status(httpStatus.OK).json({
  //       success: true,
  //       statusCode: httpStatus.OK,
  //       message: 'Car returned successfully',
  //       data: updatedBooking,
  //     });
    
  // });
  const returnCar = catchAsync(async (req, res) => {
    const { bookingId, endTime } = req.body;
    const token = req.headers.authorization?.split(' ')[1]; // Assuming 'Bearer <token>'
  
    const updatedBooking = await BookingServices.returnCar(bookingId, endTime, token as string);
  
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Car returned successfully',
      data: updatedBooking,
    });
  });
  



export const BookingController = {
    createUserBooking,
    getAllBookings,
    getUserBookings,
    returnCar
};
