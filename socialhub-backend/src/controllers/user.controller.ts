import { Response } from "express";
import User from "../models/User";
import { redis } from "../config/redis";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ApiError } from "../utils/ApiError";

export const getMe = async (req: AuthRequest, res: Response) => {
   const cacheKey = `user:${req.userId}`;

   // 🔥 1. Check cache
  const cachedUser = await redis.get(cacheKey);
  if (cachedUser) {
    return res.json({
      success: true,
      user: JSON.parse(cachedUser),
      source: "cache"
    });
  }

  // 🔥 2. DB call
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
 // 🔥 3. Save to cache (TTL = 60 sec)
  await redis.setex(cacheKey, 60, JSON.stringify(user));

  res.json({
    success: true,
    user,
    source: "db"
  });
};
