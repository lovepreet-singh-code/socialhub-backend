import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../validators/auth.validator";
import { authLimiter } from "../config/rateLimit";
import passport from "passport";
import { generateToken } from "../utils/jwt";


const router = Router();

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req: any, res) => {
    const token = generateToken(req.user._id.toString());

    res.json({
      success: true,
      provider: "google",
      token,
    });
  }
);


// 🔴 GitHub start
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// 🔴 GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req: any, res) => {
    const token = generateToken(req.user._id.toString());
    res.json({
      success: true,
      provider: "github",
      token,
    });
  }
);

export default router;
