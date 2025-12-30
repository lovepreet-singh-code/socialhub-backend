import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { redis } from "./redis";

export const authLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (command: string, ...args: string[]) => redis.call(command, ...args) as Promise<any>,
    }),
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many attempts, try again later",
    },
});
