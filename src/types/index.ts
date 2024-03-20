import { z } from "zod";
import { PostSchema } from "../schemas";

export type Post = z.infer<typeof PostSchema>;

export interface IGeneralError {
    message: string;
    status: number;
}

export interface IBadRequestError {
    path: (string | number)[];
    message: string;
}

export interface ICreatePost {
    title: string;
    content: string;
}
