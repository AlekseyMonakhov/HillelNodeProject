import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE } from "../enum";
import { User } from "@prisma/client";

function getUserFromCookie(req: Request, res: Response, next: NextFunction) {
    if (req.cookies[COOKIE.TOKEN]) {
        try {
            const decoded = jwt.verify(
                req.cookies[COOKIE.TOKEN],
                process.env.JWT_SECRET!
            ) as User;

            req.user = decoded;
        } catch (error) {
            console.log(error);
            res.clearCookie(COOKIE.TOKEN);
            return res.redirect("/");
        }
    }

    next();
}

export default getUserFromCookie;
