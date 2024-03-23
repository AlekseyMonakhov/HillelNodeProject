import { CookieOptions, Request, Response, NextFunction } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import { COOKIE } from "../enum";
import { BadRequest, ServerError } from "../errors";
import UserService from "../service/userService";
import { PageRoutes } from "../constants";

const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
};

export async function loginUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { email, password } = req.body;
    try {
        const user = await UserService.getUserByEmail(email);

        if (!user) {
            return next(
                new BadRequest([
                    { path: ["email"], message: "Email does not exist" },
                ])
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(
                new BadRequest([
                    { path: ["password"], message: "Invalid password" },
                ])
            );
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        res.cookie(COOKIE.TOKEN, token, cookieOptions);

        res.status(200).json({
            message: "User registered successfully",
            redirect: PageRoutes.MY_POSTS,
        });
    } catch (error) {
        console.log(error);
        next(
            new ServerError("Ploblems while login user", (error as Error).stack)
        );
    }
}

export async function registerUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserService.createUser({
            email,
            password: hashedPassword,
            role: "USER",
        });

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        res.cookie(COOKIE.TOKEN, token, cookieOptions);

        res.status(200).json({
            message: "User registered successfully",
            redirect: PageRoutes.MY_POSTS,
        });
    } catch (error) {
        console.log(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return next(
                    new BadRequest([
                        { path: ["email"], message: "Email already exists" },
                    ])
                );
            }
        }

        next(
            new ServerError(
                "Ploblems while register user",
                (error as Error).stack
            )
        );
    }
}

export function logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
        res.clearCookie(COOKIE.TOKEN);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        next(
            new ServerError(
                "Ploblems while logout user",
                (error as Error).stack
            )
        );
    }
}
