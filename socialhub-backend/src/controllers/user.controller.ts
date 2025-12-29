import { Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getMe = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.userId).select("-password");

  res.json({
    success: true,
    user,
  });
};
