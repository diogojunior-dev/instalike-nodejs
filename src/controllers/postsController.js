import getTodosPots from "../models/postsModel.js";

export async function listarPosts(req, res) {
    const posts = await getTodosPots();
    res.status(200)
        .json(posts);
}