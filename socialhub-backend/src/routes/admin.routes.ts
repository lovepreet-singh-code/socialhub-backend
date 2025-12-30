import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../validators/auth.validator";
import { register } from "../controllers/auth.controller";



const router = Router();

router.post("/register", validate(registerSchema), register);

router.get("/dashboard",
    protect,
    allowRoles("ADMIN"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin 👑"
        });
    }
);

export default router;
