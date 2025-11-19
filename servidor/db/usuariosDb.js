import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import { usuariosColecao } from "./dbConnect.js";

function adicionarUsuario({ nome, senha }) {

  const { hashSenha, salSenha } = criaHashESalSenha(senha)

  const resultado = usuariosColecao.insertOne({
    nome,
    hashSenha,
    salSenha
  });

  return resultado;
}


function obterUsuarios() {
  const documentos = usuariosColecao.find().toArray();
  return documentos;
}

function encontrarUsuario(nome) {
  const documento = usuariosColecao.findOne({
    nome,
  });

  return documento;
}

function atualizaUsuario(nome, texto) {
  const atualizacao = usuariosColecao.updateOne(
    {
      nome,
    },
    {
      $set: {
        texto,
      },
    }
  );

  return atualizacao;
}

function excluirUsuario(nome) {
  const resultado = usuariosColecao.deleteOne({
    nome,
  });

  return resultado;
}

export {
  encontrarUsuario,
  atualizaUsuario,
  obterUsuarios,
  adicionarUsuario,
  excluirUsuario,
};
