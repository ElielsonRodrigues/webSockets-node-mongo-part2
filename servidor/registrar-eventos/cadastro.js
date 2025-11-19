import { adicionarUsuario, encontrarUsuario } from "../db/usuariosDb.js";

function registrarEventosCadastro(socket, io) {

    socket.on("cadastrar_usuario", async (dados) => {
        //console.log(dados);
        const existeUsuario = await encontrarUsuario(dados.nome);

        if (existeUsuario === null) {
            const resultado = await adicionarUsuario(dados);
            if (resultado.acknowledged) {
                socket.emit("cadastro_sucesso");
            } else {
                socket.emit("cadastro_erro");
            }
        } else {
            //console.log("usuario ja existe");
            socket.emit("usuario_existe");
        }
    });

}

export default registrarEventosCadastro;