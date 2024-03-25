import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import routes from "./routes";
import getUserFromCookie from "./middlewares/getUserFromCookie";
import errorHandler from "./controllers/error";
import { NotFound } from "./errors";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "src", "views"));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(getUserFromCookie);

app.use(routes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new NotFound("Route not found"));
});
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server is running on port 3000");
});
