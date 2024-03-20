import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "../errors";

export default function isAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) {
        throw new Unauthorized("You must be logged in");
    }
    next();
}
