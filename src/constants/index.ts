export const enum PageRoutes {
    HOME = "/",
    AUTH = "/auth",
    MY_POSTS = "/my-posts",
    ADMIN = "/admin",
}

export const enum ApiRoutes {
    AUTH = "/auth",
    LOGIN = "/login",
    REGISTER = "/register",
    LOGOUT = "/logout",

    POSTS = "/posts",
    GET_POSTS = "/",
    GET_POST = "/:id",
    CREATE_POST = "/create",
    UPDATE_POST = "/update/:id",
    DELETE_POST = "/delete/:id",

    COMMENTS = "/comments",
    CREATE_COMMENT = "/create/:postId",
    UPDATE_COMMENT = "/update/:commentId",
    DELETE_COMMENT = "/delete/:commentId",
}
