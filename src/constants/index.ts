export const enum PageRoutes {
    HOME = "/",
    AUTH = "/auth",
    MY_POSTS = "/my-posts",
    ADMIN = "/admin",
}

export const enum ApiRoutes {
    HOST = "http://localhost:3000",

    AUTH = "/auth",
    AUTH_LOGIN = "/login",
    AUTH_REGISTER = "/register",
    AUTH_LOGOUT = "/logout",

    POSTS = "/posts",
    POSTS_GET_POSTS = "/",
    POSTS_GET_POST = "/:id",
    POSTS_CREATE_POST = "/create",
    POSTS_UPDATE_POST = "/update/:id",
    POSTS_DELETE_POST = "/delete/:id",

    COMMENTS = "/comments",
    COMMENTS_CREATE_COMMENT = "/create/:postId",
    COMMENTS_UPDATE_COMMENT = "/update/:commentId",
    COMMENTS_DELETE_COMMENT = "/delete/:commentId",

    MAKE_ADMIN = "/make-admin/:userId",

    ADMIN = "/admin",
    ADMIN_GET_USERS = "/users",
    ADMIN_DELETE_USER = "/delete/:userId",
}
