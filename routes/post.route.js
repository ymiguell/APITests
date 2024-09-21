import { Router } from "express";
import { findPost, createPost } from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.get('/post/:id', (request, response) => findPost(request, response));
postRouter.post("/post/create", (request, response) => createPost(request, response));

export default postRouter;