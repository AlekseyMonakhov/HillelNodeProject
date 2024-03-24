import express from "express";
import { z } from "zod";
import { validateBody, validateParams } from "../../middlewares/validation";
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
} from "../../controllers/posts";
import { ApiRoutes } from "../../constants";
import { PostSchema } from "../../schemas";

const router = express.Router();

const PostParamSchema = z.object({
    id: z.string().uuid(),
});

router.get(ApiRoutes.POSTS_GET_POSTS, getPosts);

router.get(
    ApiRoutes.POSTS_GET_POST,
    validateParams(PostParamSchema),
    getPostById
);

router.post(ApiRoutes.POSTS_CREATE_POST, validateBody(PostSchema), createPost);

router.patch(
    ApiRoutes.POSTS_UPDATE_POST,
    [validateParams(PostParamSchema), validateBody(PostSchema)],
    updatePost
);

router.delete(
    ApiRoutes.POSTS_DELETE_POST,
    validateParams(PostParamSchema),
    deletePost
);

export default router;
