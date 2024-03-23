import { z } from "zod";

export const PostSchema = z.object({
    title: z.string().min(3).max(60),
    content: z.string().min(3).max(255),
});

export const CommentSchema = z.object({
    content: z.string().min(3).max(255),
});
