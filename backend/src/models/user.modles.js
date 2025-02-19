import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePictureUrl: {
        type: String,
    },
    experience: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    }
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  userSchema.methods.isPasswordCorrect = async function (password) {
    const value = await bcrypt.compare(password, this.password);
    return value;
  };
  
  userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
      {
        id: this._id,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      },
    );
  };

export const User = mongoose.models.User || mongoose.model("User", userSchema);
