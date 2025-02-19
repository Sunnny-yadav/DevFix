import { User } from "../models/user.modles.js";
import {AsyncHandeller} from "../utils/AsyncHandeller.js"
import { upload_On_Cloudinary } from "../utils/Cloudinary.js";
import {ApiResponse} from '../utils/ApiResponse.js'


const registerUser = AsyncHandeller(async (req, res, next)=>{

    const {fullName, userName, email, password, experience} = req.body;

    if([fullName, userName, email, password, experience].some((inputField)=> inputField === "")){
        return next({
            status: 400,
            message: "All Fields are required"
        })
    }

    const check = await User.findOne({email})

    if(check){
        return next({
            status:400,
            message:"email already exist"
        })
    }

    const profilePicturePath = req.file?.path;


    if(!profilePicturePath){
        return next({
            status:400,
            message:"Internal Server Error , plz try again"
        })
    }

    const profilePictureUrl = await upload_On_Cloudinary(profilePicturePath)

    if(!profilePicturePath){
        return next({
            status:400,
            message:"Failed to uplaod image, try again "
        })
    }

    const user = await User.create({
        fullName,
        userName,
        experience,
        email,
        password,
        profilePictureUrl
    });

    if(!user){
        return next({
            status:400,
            message:"Registration Process Failed"
        })
    }

    return res.status(200).json(new ApiResponse(200, user, "user registration successfull"))

});

const login_User = AsyncHandeller(async (req, res) => {

  
    const { email, password } = req.body;
  
    if (!email) {
      return res.status(400).json({
        message: "email and password fields are requried for login",
      });
    }
  
    const user = await User.findOne({
      email
    });
  
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
  
    const password_Status = await user.isPasswordCorrect(password);
  
    if (!password_Status) {
      return res.status(400).json({
        message: "Login password not matched",
      });
    }
    const role_Value = user.role;
    const AccessToken = await user.generateAccessToken();
  
    if (!AccessToken) {
      return res.status(400).json({
        message: "Access Token not generated",
      });
    }
  
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { AccessToken, role_Value },
          "User Login Successfull",
        ),
      );
  });

export {registerUser, login_User}
