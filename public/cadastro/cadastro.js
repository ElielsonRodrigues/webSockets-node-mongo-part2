import { emitirCadastrarUsuario } from "./socket-front-cadastro.js";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (evento) => {
    evento.preventDefault(); // PERMITE QUE A PAGINA NÃO RECARREGUE AO USAR O EVENTO DE SUBMIT DO FORM


    const nome = form["input-usuario"].value;
    const senha = form["input-senha"].value;

    //console.log(usuario, senha);

    //chama função que emit para o back ação dos dados do usuario;
    emitirCadastrarUsuario({ nome, senha });
});