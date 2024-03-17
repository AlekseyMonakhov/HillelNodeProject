import express from "express";
import pagesRouter from "./pages";
import authRouter from "./auth";

const router = express.Router();

router.use(pagesRouter);
router.use("/auth", authRouter);

export default router;
