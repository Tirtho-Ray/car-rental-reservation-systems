import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.services";
import config from "../../config";

const createUser = catchAsync(async(req,res)=>{
    const result = await UserServices.createUserIntoDB(req.body);
        sendResponse(res ,{
            statusCode: httpStatus.OK,
            success: true,
            message:"User is created successfully",
            data: result
        })
})
const login = catchAsync(async (req, res) => {
    const { user,accessToken, refreshToken } = await UserServices.loginUser(req.body);
    // const user = await UserServices.loginUser(req.body)
  
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
    });

    // const userWithoutPassword = user.toObject() as { password?: string };

    // // Remove the password field
    // delete userWithoutPassword.password;


    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      data: {
        user
      },
      token: accessToken,
    });
  });

// const login = catchAsync(async (req, res) => {
//     const { user, accessToken, refreshToken } = await UserServices.loginUser(req.body);
  
//     // Check if user is not found or some other condition
//     if (!user) {
//       return sendResponse(res, {
//         statusCode: httpStatus.UNAUTHORIZED,
//         success: false,
//         message: "User not found or credentials are incorrect"
//       });
//     }
  
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: config.NODE_ENV === "production",
//     });
  
//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "User logged in successfully!",
//       data: {
//         user  // Include the user data here
//       },
//       token: accessToken,
//     });
//   });

  
export const UserController = {
    createUser,
    login
}