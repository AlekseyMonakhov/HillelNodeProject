import express from "express";
const router = express.Router();
import PostService from "../../service/postService";
import { User } from "@prisma/client";
import { PageRoutes } from "../../constants";

router.get(PageRoutes.HOME, (req, res) => {
    const isAuth = Boolean(req.user);
    res.render("main", { title: "Home", isAuth });
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

    const normalizedPosts = posts.map((post) => {
        const { authorId, ...rest } = post;
        return {
            ...rest,
            createdAt: new Date(post.createdAt).toLocaleString(),
            updatedAt: new Date(post.updatedAt).toLocaleString(),
            isUpdated: new Date(post.updatedAt).getTime() !== new Date(post.createdAt).getTime(),
        };
    });

    res.render("myPosts", {
        title: "My Posts",
        isAuth,
        posts: normalizedPosts,
    });
});

router.get(PageRoutes.ADMIN, (req, res) => {
    const isAdmin = req.user?.role === "ADMIN";

    if (!isAdmin) {
        return res.redirect(PageRoutes.HOME);
    }

    res.render("admin", { title: "Admin page", isAuth: true });
});

export default router;
