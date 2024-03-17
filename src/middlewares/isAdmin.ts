import { Request, Response, NextFunction } from "express";

function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user?.role !== "ADMIN") {
        return res.redirect("/");
    }

    next();
}

export default isAdmin;