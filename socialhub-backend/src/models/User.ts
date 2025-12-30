import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional for OAuth users
  role: "USER" | "ADMIN";
  googleId?: string;
  githubId?: string;
  authProvider: "LOCAL" | "GOOGLE" | "GITHUB";
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false, // Not required for OAuth users
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    googleId: {
      type: String,
    },
    githubId: {
      type: String,
    },
    authProvider: {
      type: String,
      enum: ["LOCAL", "GOOGLE", "GITHUB"],
      default: "LOCAL",
    },
  },
  { timestamps: true }
);


export default mongoose.model<IUser>("User", UserSchema);
