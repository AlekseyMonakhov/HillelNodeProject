import prisma from "../prismaClient";
import { Prisma, Post } from "@prisma/client";

class PostService {
    async getAllPosts() {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return posts;
    }

    async getPostById(postId: string) {
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        return post;
    }

    async createPost(data: Prisma.PostCreateInput) {
        const post = await prisma.post.create({
            data,
        });

        return post;
    }

    async updatePost(postId: string, data: Prisma.PostUpdateInput) {
        const post = await prisma.post.update({
            where: {
                id: postId,
            },
            data,
        });

        return post;
    }

    async deletePost(postId: string) {
        const post = await prisma.post.delete({
            where: {
                id: postId,
            },
        });

        return post;
    }

    async getPostsByAuthorId(authorId: string) {
        const posts = await prisma.post.findMany({
            where: {
                authorId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return posts;
    }
}

export default new PostService();
