import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { ApiError } from "../utils/ApiError";
import User from "../models/User";

export const allowRoles = (...roles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.userId);

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    if (!roles.includes(user.role)) {
      return next(new ApiError(403, "Access denied"));
    }

    next();
  };
};
