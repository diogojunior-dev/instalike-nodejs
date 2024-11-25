import express from "express";
import multer from "multer";
import cors from "cors";


const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

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
    app.use(cors(corsOptions));

    app.get("/posts", postsController.listarPosts);

    app.post("/posts", postsController.criarPost);

    app.post("/upload", upload.single("imagem"), postsController.uploadImagem);

    app.put("/upload/:id", postsController.atualizarPost);
}

export default routes;