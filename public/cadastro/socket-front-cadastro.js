const socket = io();
function emitirCadastrarUsuario(dados) {
    socket.emit("cadastrar_usuario", dados);
}

socket.on("cadastro_sucesso", () => alert("Cadastrado com sucesso!"));
socket.on("cadastro_erro", () => alert("Erro ao cadastrar"));
socket.on("usuario_existe", () => alert("Este usuario ja existe"));

export { emitirCadastrarUsuario };

