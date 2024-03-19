import express from "express";
const router = express.Router();
import PostService from "../../service/postService";
import { User } from "@prisma/client";

router.get("/", (req, res) => {
    const isAuth = req.isUserAuthenticated;
    res.render("main", { title: "Home", isAuth });
});

router.get("/auth", (req, res) => {
    const isAuth = req.isUserAuthenticated;
    res.render("auth", { title: "Auth", isAuth });
});

router.get("/my-posts", async (req, res) => {
    const isAuth = req.isUserAuthenticated;

    if (!isAuth) {
        return res.redirect("/");
    }

    const user = req.user as User;
    const posts = await PostService.getPostsByAuthorId(user.id);

    res.render("myPosts", {
        title: "My Posts",
        isAuth,
        posts: posts,
    });
});

router.get("/admin", (req, res) => {
    const isAdmin = req.user?.role === "ADMIN";

    if (!isAdmin) {
        return res.redirect("/");
    }

    res.render("admin", { title: "Admin page", isAuth: true });
});

export default router;
