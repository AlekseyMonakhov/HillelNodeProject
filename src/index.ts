import express, { Request, Response, NextFunction } from "express";
import path from "path";
import routes from "./routes";
import getUserFromCookie from "./middlewares/getUserFromCookie";
import isUserAuth from "./middlewares/isUserAuth";
import cookieParser from "cookie-parser";

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

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
