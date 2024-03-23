import express from "express";
import authRouter from "./auth";
import pagesRouter from "./pages";
import postRouter from "./posts";
import commentRouter from "./comments";
import { ApiRoutes } from "../constants";
import isAuth from "../middlewares/isAuth";

const router = express.Router();

router.use(pagesRouter);
router.use(ApiRoutes.AUTH, authRouter);
router.use(ApiRoutes.POSTS, isAuth, postRouter);
router.use(ApiRoutes.COMMENTS, isAuth, commentRouter);

export default router;
