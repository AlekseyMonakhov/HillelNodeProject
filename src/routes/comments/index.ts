import express from "express";
import { z } from "zod";
import { validateBody, validateParams } from "../../middlewares/validation";
import {
    createComment,
    updateComment,
    deleteComment,
} from "../../controllers/comments";
import { ApiRoutes } from "../../constants";
import { CommentSchema } from "../../schemas";

const router = express.Router();

const PostParamSchema = z.object({
    postId: z.string().uuid(),
});

const CommentParamSchema = z.object({
    commentId: z.string().uuid(),
});

router.post(
    ApiRoutes.CREATE_COMMENT,
    [validateParams(PostParamSchema), validateBody(CommentSchema)],
    createComment
);

router.patch(
    ApiRoutes.UPDATE_COMMENT,
    [validateParams(CommentParamSchema), validateBody(CommentSchema)],
    updateComment
);

router.delete(
    ApiRoutes.DELETE_COMMENT,
    validateBody(CommentParamSchema),
    deleteComment
);

export default router;
