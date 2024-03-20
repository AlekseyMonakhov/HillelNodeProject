import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { BadRequest, ServerError } from "../errors";

export const validateBody = (schema: z.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.errors.map((err) => {
                    const { path, message } = err;
                    return { path, message };
                });

                next(new BadRequest(errors));
            } else {
                next(
                    new ServerError(
                        "Something went wrong",
                        (error as Error).stack
                    )
                );
            }
        }
    };
};


export const validateParams = (schema: z.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.params);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.errors.map((err) => {
                    const { path, message } = err;
                    return { path, message };
                });

                next(new BadRequest(errors));
            } else {
                next(
                    new ServerError(
                        "Something went wrong",
                        (error as Error).stack
                    )
                );
            }
        }
    };
}
