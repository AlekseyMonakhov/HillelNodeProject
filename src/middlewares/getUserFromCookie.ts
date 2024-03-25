import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { Cookie } from "../constants";

function getUserFromCookie(req: Request, res: Response, next: NextFunction) {
    if (req.cookies[Cookie.TOKEN]) {
        try {
            const decoded = jwt.verify(
                req.cookies[Cookie.TOKEN],
                process.env.JWT_SECRET!
            ) as User;

            req.user = decoded;
        } catch (error) {
            console.log(error);
            res.clearCookie(Cookie.TOKEN);
            return res.redirect("/");
        }
    }

    next();
}

export default getUserFromCookie;
