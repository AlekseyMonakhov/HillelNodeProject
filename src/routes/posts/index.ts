import express from "express";
import { z } from "zod";
import { validateBody, validateParams } from "../../middlewares/validation";
import {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
} from "../../controllers/posts";
import { ApiRoutes } from "../../constants";
import { PostSchema } from "../../schemas";

const router = express.Router();

const PostParamSchema = z.object({
    id: z.string().uuid(),
});

router.get(ApiRoutes.GET_POSTS, getPosts);

router.get(ApiRoutes.GET_POST, validateParams(PostParamSchema), getPost);

router.post(ApiRoutes.CREATE_POST, validateBody(PostSchema), createPost);

router.put(
    ApiRoutes.UPDATE_POST,
    [validateParams(PostParamSchema), validateBody(PostSchema)],
    updatePost
);

router.delete(
    ApiRoutes.DELETE_POST,
    validateParams(PostParamSchema),
    deletePost
);

export default router;
