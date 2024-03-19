import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";
import validate from "../../middlewares/validation";
import { loginUser, registerUser, logoutUser } from "../../controllers/auth";

const router = express.Router();

const authScema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().regex(/(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, {
        message:
            "Password must contain at least one letter, one number and be at least 8 characters long",
    }),
});

router.post("/login", validate(authScema), loginUser);

router.post("/register", validate(authScema), registerUser);

router.get("/logout", logoutUser);

export default router;
