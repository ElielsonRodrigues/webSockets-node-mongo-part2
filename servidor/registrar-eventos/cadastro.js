function registrarEventosCadastro(socket, io) {

    socket.on("cadastrar_usuario", async (dados) => {
        console.log(dados);
    });

}

export default registrarEventosCadastro;