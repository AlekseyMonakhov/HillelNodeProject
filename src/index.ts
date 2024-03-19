import express, { Request, Response, NextFunction } from "express";
import path from "path";
import routes from "./routes";
import getUserFromCookie from "./middlewares/getUserFromCookie";
import isUserAuth from "./middlewares/isUserAuth";
import cookieParser from "cookie-parser";
import errorHandler from "./controllers/error";
import { NotFound } from "./errors";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "src", "views"));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(getUserFromCookie);
app.use(isUserAuth);

app.use(routes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    console.log("Route not found");

    next(new NotFound("Route not found"));
});

app.use(errorHandler);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
