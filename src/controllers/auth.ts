import { CookieOptions, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import { BadRequest, ServerError } from "../errors";
import UserService from "../service/userService";
import { Cookie, PageRoutes } from "../constants";

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
            { expiresIn: "1h" } // better to have expiration time in env, but fine
        );

        res.cookie(Cookie.TOKEN, token, cookieOptions);

        res.status(200).json({
            message: "User registered successfully",
            redirect: PageRoutes.MY_POSTS,
        });
    } catch (error) {
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

        //! this token creation is the same you use in login and register. Extract to a function?
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        res.cookie(Cookie.TOKEN, token, cookieOptions);

        res.status(200).json({
            message: "User registered successfully",
            redirect: PageRoutes.MY_POSTS,
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return next(
                new BadRequest([
                    { path: ["email"], message: "Email already exists" },
                ])
            );
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
        res.clearCookie(Cookie.TOKEN);
        res.redirect("/");
    } catch (error) {
        next(
            new ServerError(
                "Ploblems while logout user",
                (error as Error).stack
            )
        );
    }
}
