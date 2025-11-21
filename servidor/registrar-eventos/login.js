import { encontrarUsuario } from "../db/usuariosDb.js"

import autenticarUsuario from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";

function registrarEventosLogin(socket, io) {
    socket.on("autenticar_usuario", async ({ nome, senha }) => {

        const usuario = await encontrarUsuario(nome);


        if (usuario) {
            const autenticado = autenticarUsuario(senha, usuario);

            if (autenticado) {
                // chamando minha função utils que gera o token Jwt
                const tokenJwt = gerarJwt({ user: nome }); // gera payload do jwt somente com nome do usuario
                console.log(tokenJwt);
                socket.emit("autenticado_sucesso");
            } else {
                socket.emit("autenticacao_falha");
            }
        } else {
            socket.emit("autenticacao_inexistente");

        }



    })
}

export default registrarEventosLogin;