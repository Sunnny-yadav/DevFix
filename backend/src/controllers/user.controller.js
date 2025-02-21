import { User } from "../models/user.modles.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import { upload_On_Cloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = AsyncHandeller(async (req, res, next) => {
  const { fullName, userName, email, password, confirmPassword, experience } =
    req.body;

  // Check for missing fields
  if (
    [fullName, userName, email, password, experience, confirmPassword].some(
      (inputField) => inputField === ""
    )
  ) {
    return next({
      status: 400,
      message: "All Fields are required",
    });
  }

  // Check for password match
  if (password !== confirmPassword) {
    return next({
      status: 400,
      message: "Password and Confirm Password Mismatched",
    });
  }

  // Check if email or username already exists
  const check = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (check) {
    const message =
      check.email === email
        ? "Email already exists"
        : "Username already exists";
    return next({
      status: 400,
      message,
    });
  }

  // Profile picture handling
  const profilePicturePath = req.file?.path;
  if (!profilePicturePath) {
    return next({
      status: 400,
      message: "Internal Server Error, please try again",
    });
  }

  const profilePictureUrl = await upload_On_Cloudinary(profilePicturePath);
  if (!profilePictureUrl) {
    return next({
      status: 400,
      message: "Failed to upload image, try again",
    });
  }

  // Create the new user
  const user = await User.create({
    fullName,
    userName,
    experience,
    email,
    password,
    profilePictureUrl,
  });

  if (!user) {
    return next({
      status: 400,
      message: "Registration Process Failed",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User registration successful"));
});

const login_User = AsyncHandeller(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "email and password fields are requried for login",
    });
  }

  const user = await User.findOne({
    email,
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
  const AccessToken = await user.generateAccessToken();

  if (!AccessToken) {
    return res.status(400).json({
      message: "Access Token not generated",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, AccessToken, "User Login Successfull"));
});

const getUserData = AsyncHandeller(async (req, res, next) => {
  const { _id } = req.userData;

  const data = await User.findOne(_id);

  if (!data) {
    return next({
      status: 400,
      message: "Fetching user data failed",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "user data fetched successfully"));
});

export { registerUser, login_User, getUserData };
