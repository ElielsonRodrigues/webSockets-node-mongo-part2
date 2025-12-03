import {
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento,
} from "../db/documentosDb.js";
import {
    adicionarConexao,
    encontrarConexao,
    obterUsuariosDocumento,
    removerConexao,
} from "../utils/conexoesDocumento.js";

function registrarEventosDocumento(socket, io) {
    socket.on(
        "selecionar_documento",
        async ({ nomeDocumento, nomeUsuario }, devolverTexto) => {
            //console.log(nomeUsuario);
            const documento = await encontrarDocumento(nomeDocumento);

            if (documento) {
                // VERIFICA SE O USUARIO JA POSSUI CONEXÃO NO DOCUMENTO
                const conexaoEncontrada = encontrarConexao(
                    nomeDocumento,
                    nomeUsuario
                );

                // SO ADICONA O USUARIO SE ELE NÃO ESTIVER NO DOCUMENTO
                if (!conexaoEncontrada) {
                    socket.join(nomeDocumento);
                    adicionarConexao({ nomeDocumento, nomeUsuario });

                    // SALVA NO SOCKET.DATA A SESSÃO DO USUARIO;
                    socket.data = {
                        usuarioEntrou: true,
                    };

                    const usuariosNoDocumento =
                        obterUsuariosDocumento(nomeDocumento);

                    // não usar 'socket.to' motivo e que o 'socket.to' irar disparar o evento para todos
                    // exceto o documento desejado e não é isso que queremos. queros somente o socket que esta
                    // conectado a este documentos
                    io.to(nomeDocumento).emit(
                        "usuarios_no_documento",
                        usuariosNoDocumento
                    );
                    //console.log(usuariosNoDocumento);
                    devolverTexto(documento.texto);
                } else {
                    socket.emit("usuario_ja_no_documento");
                }
            }

            //MOVENDO OS EVENTO 'TEXTO_EDITOR' SOMENTE CASO UM DOCUMENTO TIVER SELECIONADO
            socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
                const atualizacao = await atualizaDocumento(
                    nomeDocumento,
                    texto
                );

                if (atualizacao.modifiedCount) {
                    socket
                        .to(nomeDocumento)
                        .emit("texto_editor_clientes", texto);
                }
            });

            //MOVENDO O EVENTO 'EXCLUIR_DOCUMENTO' SOMENTE CASO UM DOCUMENTO TIVER SELECIONADO
            socket.on("excluir_documento", async (nome) => {
                const resultado = await excluirDocumento(nome);

                if (resultado.deletedCount) {
                    io.emit("excluir_documento_sucesso", nome);
                }
            });

            //REGISTRANDO SOMENTE O EVENTO DE DISCONECT DE QUEM TIVER SELECIONADO
            //UM EVENTO
            socket.on("disconnect", () => {
                //VERIFICA SE O USUARIO JA ESTA NO DOCUMENTO, SE TIVER AI SIM ELE REMOVE
                if (socket.data.usuarioEntrou) {
                    //console.log(`Cliente ${socket.id} foi desconectado`);
                    removerConexao(nomeDocumento, nomeUsuario);

                    //obtendo o usario
                    const usuariosNoDocumento =
                        obterUsuariosDocumento(nomeDocumento);

                    // não usar 'socket.to' motivo e que o 'socket.to' irar disparar o evento para todos
                    // exceto o documento desejado e não é isso que queremos. queros somente o socket que esta
                    // conectado a este documentos
                    io.to(nomeDocumento).emit(
                        "usuarios_no_documento",
                        usuariosNoDocumento
                    );
                }
            });
        }
    );
}

export default registrarEventosDocumento;
