import express from "express";

const app = express();

app.get("/api", (req, res) => {
    res.status(200).send("Boas Vindas à imersão");
});

app.listen(3000, () => {
    console.log("Sevidor escutando...");
});
