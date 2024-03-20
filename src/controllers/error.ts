import e, { Request, Response, NextFunction } from "express";
import {
    GeneralError,
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    ServerError,
} from "../errors";

function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof GeneralError) {
        if (error instanceof BadRequest) {
            return res.status(error.status).json(error.sendResponse());
        }

        if (error instanceof Unauthorized) {
            return res.render("error", {
                message: error.message,
                title: "Unauthorized",
                isAuth: Boolean(req.user),
            });
        }

        if (error instanceof Forbidden) {
            return res.render("error", {
                message: error.message,
                title: "Forbidden",
                isAuth: Boolean(req.user),
            });
        }

        if (error instanceof NotFound) {
            return res.render("error", {
                message: error.message,
                title: "Not found",
                isAuth: Boolean(req.user),
            });
        }

        return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: "Something went wrong" });
}

export default errorHandler;
