import { Request, Response } from "express";
import PostService from "../service/postService";
import { Post } from "../types";
import { ServerError } from "../errors";
import { PageRoutes } from "../constants";

export async function createPost(req: Request, res: Response) {
    const { content, title } = req.body as Post;
    const author = req.user!;

    try {
        await PostService.createPost({
            content,
            title,
            author: {
                connect: {
                    id: author.id,
                },
            },
        });

        res.status(201).redirect(PageRoutes.MY_POSTS);
    } catch (error) {
        throw new ServerError("Failed to create post", (error as Error).stack);
    }
}

export function getPosts(req: Request, res: Response) {
    res.send("getPosts");
}

export function getPost(req: Request, res: Response) {
    res.send("getPost");
}

export function updatePost(req: Request, res: Response) {
    res.send("updatePost");
}

export function deletePost(req: Request, res: Response) {
    res.send("deletePost");
}
