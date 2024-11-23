import express from "express";
import multer from "multer";

import postsController from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const routes = (app) => {
    app.use(express.json());

    app.get("/posts", postsController.listarPosts);

    app.post("/posts", postsController.criarPost);

    app.post("/upload", upload.single("imagem"), postsController.uploadImagem);
}

export default routes;