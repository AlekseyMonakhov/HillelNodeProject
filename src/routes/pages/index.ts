import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    const isAuth = req.isUserAuthenticated;
    res.render("main", { title: "Home", isAuth });
});

router.get("/auth", (req, res) => {
    const isAuth = req.isUserAuthenticated;
    res.render("auth", { title: "Auth", isAuth });
});

router.get("/my-posts", (req, res) => {
    const isAuth = req.isUserAuthenticated;

    if (!isAuth) {
        return res.redirect("/");
    }

    res.render("myPosts", { title: "My Posts", isAuth });
});

router.get("/admin", (req, res) => {
    const isAuth = req.isUserAuthenticated;

    if (!isAuth) {
        return res.redirect("/");
    }

    const isAdmin = req.user?.role === "ADMIN";

    if (!isAdmin) {
        return res.redirect("/");
    }

    res.render("admin", { title: "Admin page", isAuth });
});

export default router;
