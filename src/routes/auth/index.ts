import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { validateBody } from "../../middlewares/validation";
import { loginUser, registerUser, logoutUser } from "../../controllers/auth";
import { ApiRoutes } from "../../constants";

const router = express.Router();

const authScema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().regex(/(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, {
        message:
            "Password must contain at least one letter, one number and be at least 8 characters long",
    }),
});

router.post(ApiRoutes.AUTH_LOGIN, validateBody(authScema), loginUser);

router.post(ApiRoutes.AUTH_REGISTER, validateBody(authScema), registerUser);

router.get(ApiRoutes.AUTH_LOGOUT, logoutUser);

export default router;
