import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
const db = conexao.db("alura-instalike"); 
const colecao = db.collection("posts");  

const postsModel = {
  getTodosPots: async () => {
    return colecao.find().toArray();
  },
  criarPost: async (novoPost) => {
    return colecao.insertOne(novoPost);
  },
  atualizarPost: async (id, post) => {
    const objectID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objectID)}, {$set: post});    
  }
}

export default postsModel;