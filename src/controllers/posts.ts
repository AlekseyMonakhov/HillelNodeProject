import { Request, Response } from "express";
import PostService from "../service/postService";
import { Post } from "../types";
import { ServerError, NotFound } from "../errors";


export async function createPost(req: Request, res: Response) {
    const { content, title } = req.body as Post;
    const author = req.user!;

    try {
        const newPost = await PostService.createPost({
            content,
            title,
            author: {
                connect: {
                    id: author.id,
                },
            },
        });

        res.status(201).json({
            id: newPost.id,
        });
    } catch (error) {
        throw new ServerError("Failed to create post", (error as Error).stack);
    }
}

export async function getPosts(req: Request, res: Response) {
    const posts = await PostService.getAllPosts();

    res.status(200).json(posts);
}

export async function getPostById(req: Request, res: Response) {
    const postId = req.params.id;

    try {
        const post = await PostService.getPostById(postId);

        if (!post) {
            throw new NotFound("Post not found");
        }

        res.status(200).json(post);
    } catch (error) {
        throw new ServerError("Failed to get post", (error as Error).stack);
    }
}

export async function updatePost(req: Request, res: Response) {
    const postId = req.params.id;
    const { content, title } = req.body as Partial<Post>;

    try {
        const updatedPost = await PostService.updatePost(postId, {
            content,
            title,
        });

        if (!updatedPost) {
            throw new NotFound("Post not found");
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        throw new ServerError("Failed to update post", (error as Error).stack);
    }
}

export async function deletePost(req: Request, res: Response) {
    const postId = req.params.id;

    try {
        const deletedPost = await PostService.deletePost(postId);

        if (!deletedPost) {
            throw new NotFound("Post not found");
        }

        res.status(200).json({
            id: deletedPost.id,
        });
    } catch (error) {
        throw new ServerError("Failed to delete post", (error as Error).stack);
    }
}
