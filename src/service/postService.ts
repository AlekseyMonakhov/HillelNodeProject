import prisma from "../prismaClient";
import { Prisma } from "@prisma/client";

class PostService {
    getAllPosts() {
        return prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    getPostById(postId: string) {
        return prisma.post.findUnique({
            where: {
                id: postId,
            },
        });
    }

    createPost(data: Prisma.PostCreateInput) {
        return prisma.post.create({
            data,
        });
    }

    updatePost(postId: string, data: Prisma.PostUpdateInput) {
        return prisma.post.update({
            where: {
                id: postId,
            },
            data,
        });
    }

    deletePost(postId: string) {
        return prisma.post.delete({
            where: {
                id: postId,
            },
        });
    }

    getPostsByAuthorId(authorId: string) {
        return prisma.post.findMany({
            where: {
                authorId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
}

export default new PostService();
