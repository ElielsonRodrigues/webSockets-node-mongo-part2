import { MongoClient } from "mongodb";

const cliente = new MongoClient(
  "mongodb://root:123456@localhost:27017/aluraSocketio?authSource=admin"
);

let documentosColecao, usuariosColecao;

try {
  await cliente.connect();

  const db = cliente.db("alura-websockets-jwt");
  documentosColecao = db.collection("documentos");
  usuariosColecao = db.collection("usuarios");


  console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
  console.log(erro);
}

export { documentosColecao, usuariosColecao };
