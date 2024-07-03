
// import { AuthService } from "./auth.services";
// import config from "../../config";
// import catchAsync from "../../utils/catchAsync";


// // const register = catchAsync(async (req, res) => {
// //   const result = await AuthService.register(req.body);

// //   res.status(200).json({
// //     success: true,
// //     message: "User registered successfully!",
// //     data: result,
// //   });
// // });

// const login = catchAsync(async (req, res) => {
//   const {user, accessToken, refreshToken } = await AuthService.login(req.body);

//   res.cookie("refreshToken", refreshToken, {
//     httpOnly: true,
//     secure: config.NODE_ENV === "production",
//   });

//   res.status(200).json({
//     success: true,
//     message: "User logged in successfully!",
//     data: {
//       user,
//     },
//     token: accessToken,
//   });
// });

// export const AuthControllers = {
//   // register,
//   login,
// };