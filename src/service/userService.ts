import prisma from "../prismaClient";
import { Prisma } from "@prisma/client";

class UserService {
    async getUserPosts(userId: string) {
        const posts = await prisma.post.findMany({
            where: {
                authorId: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return posts;
    }

    async getUser(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        return user;
    }

    async updateUser(userId: string, data: Prisma.UserUpdateInput) {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data,
        });

        return user;
    }

    async deleteUser(userId: string) {
        const user = await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        return user;
    }

    async createUser(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        });

        return user;
    }

    async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async getAllUsers() {
        const users = await prisma.user.findMany();

        return users;
    }
}

export default new UserService();
