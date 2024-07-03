
import config from "../../config";
import { isPasswordMatched } from "../auth/auth.utiles";
import { TUser } from "./user.interface";
import { User } from "./user.model"
import jwt from 'jsonwebtoken';

const createUserIntoDB = async (payload:TUser) =>{
    const result  = await User.create(payload);
    return result;
}

const loginUser = async (payload: TUser) => {

    const user = await User.findOne({ email: payload.email }).select('+password');
    // console.log(user);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.status === 'blocked') {
      throw new Error('User is blocked');
    }
    const passwordMatch = await isPasswordMatched(
      payload.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new Error('Password not matched');
    }
    const jwtPayload = {
      email: user.email,
      role: user.role,
      id:user._id,
      
    };
    // console.log(jwtPayload);
    // console.log(jwtPayload.id);
  
  
  
  
    const accessToken = jwt.sign(
      jwtPayload,
      config.JWT_ACCESS_SECRET as string, 
      {
        expiresIn: config.JWT_ACCESS_EXPIRES_IN, 
        // console.log('JWT_ACCESS_EXPIRES_IN:', config.JWT_ACCESS_EXPIRES_IN);
  
      },
    );
    // console.log("toke is:",accessToken);
  
    const refreshToken = jwt.sign(
      jwtPayload,
      config.JWT_REFRESH_SECRET as string,
      {
        expiresIn: config.JWT_REFRESH_EXPIRES_IN,
      //   console.log('JWT_REFRESH_EXPIRES_IN:', config.JWT_REFRESH_EXPIRES_IN);
  
      },
    );
  
    return {
      user,
      accessToken,
      refreshToken,
    };
    // return {
    //     user,
    //   accessToken: `Bearer ${accessToken}`,
    //   refreshToken: `Bearer ${refreshToken}`,
    // };
  };

export const UserServices ={
    createUserIntoDB,
    loginUser

}