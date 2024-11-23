import fs from "fs";
import postsModel from "../models/postsModel.js";

const postsController = {
    listarPosts: async (req, res) => {
        const posts = await postsModel.getTodosPots();
        res.status(200)
            .json(posts);
    },

    criarPost: async (req, res) => {
        const novoPost = req.body;
        try {
            const postCriado = await postsModel.criarPost(novoPost);
            res.status(200)
                .json(postCriado);
        } catch (erro) {
            console.error(erro.message);
            res.status(500)
                .json({ "error": "Falha na requisição." });
        }
    },
    uploadImagem: async (req, res) => {
        const novoPost = {
            descricao: "",
            imgUrl: req.file.originalname,
            alt: ""
        };
        try {
            const postCriado = await postsModel.criarPost(novoPost);
            const imagemAtualizada = `uploads/${postCriado.insertedId}.jpeg`;
            fs.renameSync(req.file.path, imagemAtualizada);
            res.status(200)
                .json(postCriado);
        } catch (erro) {
            console.error(erro.message);
            res.status(500)
                .json({ "error": "Falha na requisição." });
        }
    }
}

export default postsController;
