import { Request, Response } from "express";
import { ServerError, NotFound } from "../errors";
import CommentService from "../service/commentService";

export async function createComment(req: Request, res: Response) {
    const { content } = req.body;
    const { postId } = req.params;
    const author = req.user!;

    try {
        const comment = await CommentService.createComment({
            content,
            author: {
                connect: {
                    id: author.id,
                },
            },
            post: {
                connect: {
                    id: postId,
                },
            },
        });

        res.status(201).json({
            id: comment.id,
        });
    } catch (error) {
        throw new ServerError(
            "Failed to create comment",
            (error as Error).stack
        );
    }
}

export async function updateComment(req: Request, res: Response) {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const comment = await CommentService.updateComment(id, {
            content,
        });

        if (!comment) {
            throw new NotFound("Comment not found");
        }

        res.status(200).json({
            id: comment.id,
        });
    } catch (error) {
        throw new ServerError(
            "Failed to update comment",
            (error as Error).stack
        );
    }
}

export async function deleteComment(req: Request, res: Response) {
    const { commentId } = req.params;

    try {
        const comment = await CommentService.deleteComment(commentId);

        if (!comment) {
            throw new NotFound("Comment not found");
        }

        res.status(200).json({
            id: comment.id,
        });
    } catch (error) {
        throw new ServerError(
            "Failed to delete comment",
            (error as Error).stack
        );
    }
}
