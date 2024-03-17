import { Request, Response, NextFunction } from "express";

function isUserAuth(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
        req.isUserAuthenticated = true;
    } else {
        req.isUserAuthenticated = false;
    }
    next();
}

export default isUserAuth;
