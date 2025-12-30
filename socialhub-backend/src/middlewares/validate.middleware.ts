import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";

export const validate =
    (schema: ZodType<any>) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json({
                        success: false,
                        message: error.issues[0].message
                    });
                }

                return res.status(400).json({
                    success: false,
                    message: "Invalid request data"
                });
            }
        };
