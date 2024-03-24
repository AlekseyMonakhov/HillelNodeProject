import { Request, Response, NextFunction } from "express";
import UserService from "../service/userService";
import { ServerError } from "../errors";

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await UserService.getAllUsers();

        res.status(200).json(users);
    } catch (error) {
        throw new ServerError(
            "Failed to get all users",
            (error as Error).stack
        );
    }
}

export async function deleteUser(req: Request, res: Response) {
    const userId = req.params.userId;

    try {
        const user = await UserService.deleteUser(userId);

        res.status(200).json({
            message: "User deleted",
            user,
        });
    } catch (error) {
        throw new ServerError("Failed to delete user", (error as Error).stack);
    }
}

export async function makeAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const userId = req.params.userId;

    try {
        const user = await UserService.makeAdmin(userId);

        res.status(200).json({
            message: "User is now admin",
            user,
        });
    } catch (error) {
        console.log(error);
        next(
            new ServerError(
                "Ploblems while making user admin",
                (error as Error).stack
            )
        );
    }
}
