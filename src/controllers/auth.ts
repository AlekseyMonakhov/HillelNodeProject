import { CookieOptions, Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Prisma } from "@prisma/client";
import { COOKIE } from "../enum";

const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
};

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = (await prisma.user.findUnique({
            where: {
                email,
            },
        })) as User;

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
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

        res.redirect("/my-posts");
    } catch (error) {
        console.log(error);

        res.status(401).json({ message: "Invalid credentials" });
    }
}

export async function registerUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: "USER",
            },
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

        res.redirect("/my-posts");
    } catch (error) {
        console.log(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return res
                    .status(400)
                    .json({ message: "Email already exists" });
            }
        }

        res.status(500).json({ message: "Something went wrong" });
    }
}

export function logoutUser(req: Request, res: Response) {
    try {
        res.clearCookie(COOKIE.TOKEN);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
