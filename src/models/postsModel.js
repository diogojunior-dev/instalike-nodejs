import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export default async function getTodosPots() {
  const db = conexao.db("alura-instalike"); 
  const colecao = db.collection("posts");

  return colecao.find().toArray();
}