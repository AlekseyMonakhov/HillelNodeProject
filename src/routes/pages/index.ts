import express from "express";
const router = express.Router();
import { User } from "@prisma/client";
import { PageRoutes } from "../../constants";
import PostService from "../../service/postService";
import { normalizePostComments } from "../../utils";
import userService from "../../service/userService";

router.get(PageRoutes.HOME, async (req, res) => {
    const isAuth = Boolean(req.user);
    const userId = req.user?.id;

    const posts = await PostService.getAllPosts();
    const normalizedPosts = await Promise.all(
        posts.map((post) => normalizePostComments(post, userId))
    );

    res.render("main", {
        title: "Home",
        isAuth,
        posts: normalizedPosts,
        isEditable: false,
        canAddComment: true,
    });
});

router.get(PageRoutes.AUTH, (req, res) => {
    const isAuth = Boolean(req.user);
    res.render("auth", { title: "Auth", isAuth });
});

router.get(PageRoutes.MY_POSTS, async (req, res) => {
    const isAuth = Boolean(req.user);

    if (!isAuth) {
        return res.redirect(PageRoutes.AUTH);
    }

    const user = req.user as User;
    const posts = await PostService.getPostsByAuthorId(user.id);

    const normalizedPosts = await Promise.all(
        posts.map((post) => normalizePostComments(post, user.id))
    );

    res.render("myPosts", {
        title: "My Posts",
        isAuth,
        posts: normalizedPosts,
        isEditable: true,
        canAddComment: false,
    });
});

router.get(PageRoutes.ADMIN, async (req, res) => {
    const isAdmin = req.user?.role === "ADMIN";

    if (!isAdmin) {
        return res.redirect(PageRoutes.HOME);
    }

    const users = await userService.getAllUsers();

    res.render("admin", { title: "Admin page", isAuth: true, users });
});

export default router;
