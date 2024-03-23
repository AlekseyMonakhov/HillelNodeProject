import prisma from "../prismaClient";
import { Prisma } from "@prisma/client";

export class CommentService {
    async getCommentsByPostId(postId: string) {
        const comments = await prisma.comment.findMany({
            where: {
                postId,
            },
            include: {
                author: {
                    select: {
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return comments;
    }

    async createComment(data: Prisma.CommentCreateInput) {
        const comment = await prisma.comment.create({
            data,
        });

        return comment;
    }

    async updateComment(commentId: string, data: Prisma.CommentUpdateInput) {
        const comment = await prisma.comment.update({
            where: {
                id: commentId,
            },
            data,
        });

        return comment;
    }

    async deleteComment(commentId: string) {
        const comment = await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });

        return comment;
    }
}

export default new CommentService();
