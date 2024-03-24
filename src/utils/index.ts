import { Post, Comment } from "@prisma/client";
import CommentService from "../service/commentService";

export async function normalizePostComments(
    post: Post,
    userId: string | undefined
) {
    const comments = await CommentService.getCommentsByPostId(post.id);

    const normalizedComments = comments.map((comment) =>
        normalizeComment(comment, userId)
    );

    return {
        ...post,
        createdAt: new Date(post.createdAt).toLocaleString(),
        comments: normalizedComments,
        updatedAt: new Date(post.updatedAt).toLocaleString(),
        isUpdated:
            new Date(post.updatedAt).getTime() !==
            new Date(post.createdAt).getTime(),
    };
}

function normalizeComment(
    comment: Comment & { author: { email: string } },
    userId: string | undefined
) {
    const { author, ...rest } = comment;
    const normalizedComment = {
        ...rest,
        createdAt: new Date(comment.createdAt).toLocaleString(),
        updatedAt: new Date(comment.updatedAt).toLocaleString(),
        isUpdated:
            new Date(comment.updatedAt).getTime() !==
            new Date(comment.createdAt).getTime(),

        canDelete: comment.authorId === userId,
        authorEmail: author.email,
    };

    return normalizedComment;
}
