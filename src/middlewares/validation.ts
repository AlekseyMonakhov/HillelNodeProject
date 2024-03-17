import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const validate = (schema: z.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    message: "Validation error",
                    errors: error.errors.map((err) => {
                        return {
                            path: err.path.join("."),
                            message: err.message,
                        };
                    }),
                });
            } else {
                next(error);
            }
        }
    };
};

export default validate;
