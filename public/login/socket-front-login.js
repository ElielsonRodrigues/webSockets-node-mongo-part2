const socket = io();

import { definirCookie } from "../utils/cookie.js"

function emitirAutenticarUsuario(dados) {
    socket.emit("autenticar_usuario", dados);
}

socket.on("autenticado_sucesso", (tokenJwt) => {

    definirCookie("access_token", tokenJwt);

    alert("Autenticado com sucesso!");
    window.location.href = "/";
});
socket.on("autenticacao_falha", () => alert("Usuario e senha incorretos!"));
socket.on("autenticacao_inexistente", () => alert("Usuario não encontrado na base de dados!"));



export { emitirAutenticarUsuario };

