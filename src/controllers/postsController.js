import fs from "fs";
import postsModel from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

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
    },
    atualizarPost: async (req, res) => {
        const id = req.params.id;
        const urlImagem = `http://localhost:3000/${id}.jpeg`;
        try {
            const imgBuffer = fs.readFileSync(`uploads/${id}.jpeg`);
            const descricao = await gerarDescricaoComGemini(imgBuffer);
            const post = {
                imgUrl: urlImagem,
                descricao: descricao,
                alt: req.body.alt
            };
            const postAtaulizado = await postsModel.atualizarPost(id, post);
            res.status(200)
                .json(postAtaulizado);
        } catch (erro) {
            console.error(erro.message);
            res.status(500)
                .json({ "error": "Falha na requisição." });
        }
    }
}

export default postsController;
