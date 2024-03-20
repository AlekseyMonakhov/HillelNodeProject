import express from "express";
import authRouter from "./auth";
import pagesRouter from "./pages";
import postRouter from "./posts";
import { ApiRoutes } from "../constants";
import isAuth from "../middlewares/isAuth";

const router = express.Router();

router.use(pagesRouter);
router.use(ApiRoutes.AUTH, authRouter);
router.use(ApiRoutes.POSTS, isAuth, postRouter);

export default router;
