import express from "express";

const posts = [
  {
    id: 1,
    descricao: "Uma foto teste",
    imagem: "https://placecats.com/millie/300/150"
  },
  {
    id: 2,
    descricao: "Gato fofinho dormindo",
    imagem: "https://placecats.com/millie/300/150"
  },
  {
    id: 3,
    descricao: "Paisagem incrível",
    imagem: "https://placecats.com/millie/300/150"
  },
  {
    id: 4,
    descricao: "Comida deliciosa",
    imagem: "https://placecats.com/millie/300/150"
  },
  {
    id: 5,
    descricao: "Cachorro brincando",
    imagem: "https://placecats.com/millie/300/150"
  },
  {
    id: 6,
    descricao: "Gráfico de dados",
    imagem: "https://placecats.com/millie/300/150"
  }
];

const app = express();

// Fala pro express se comunicar em json
app.use(express.json());

function buscaPostPorId(id) {
    return posts.find((post) => { 
        return post.id === Number(id);
    });
}

app.get("/posts", (req, res) => {
    res.status(200)
        .json(posts);
});

app.get("/posts/:id", (req, res) => {
    const post = buscaPostPorId(req.params.id);
    res.status(200)
        .json(post);
});

app.listen(3000, () => {
    console.log("Sevidor escutando...");
});
