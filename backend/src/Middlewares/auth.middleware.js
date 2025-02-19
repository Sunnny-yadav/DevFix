import { User } from "../models/user.modles.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import jwt from "jsonwebtoken";

export const verifyJWT = AsyncHandeller(async (req, res, next) => {
  const Token = req.header("Authorization")?.replace("Bearer ", "");
  if (!Token) {
    res.status(400).json({
      message : "Token not avilable :: unauthorized user",
    });
  }

  const decodedToken = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET_KEY);


  const user = await User.findOne({ _id: decodedToken?.id }).select("-password");

 
  if (!user) {
    res.status(400).json({
      message: "Invalid user Token",
    });
  }

  req.userData = user;
  next();
});
