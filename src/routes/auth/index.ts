import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";
import validate from "../../middlewares/validation";
import { loginUser, registerUser, logoutUser } from "../../controllers/auth";

const router = express.Router();

const authScema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8),
});

router.post("/login", validate(authScema), loginUser);

router.post("/register", validate(authScema), registerUser);

router.get("/logout", logoutUser);

export default router;
