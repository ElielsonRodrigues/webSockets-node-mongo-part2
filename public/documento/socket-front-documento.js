import { obterCookie } from "../utils/cookie.js";
import {
    alertarERedirecionar,
    atualizarInterfaceUsuarios,
    atualizaTextoEditor,
    tratarAutorizacaoSucesso,
} from "./documento.js";

const socket = io("/usuarios", {
    auth: {
        token: obterCookie("access_token"),
    },
});

socket.on("autorizar_sucesso", tratarAutorizacaoSucesso);

socket.on("connect_error", (erro) => {
    alert(erro);
    window.location.href = "/login/index.html";
});

function selecionarDocumento(dados) {
    socket.emit("selecionar_documento", dados, (texto) => {
        atualizaTextoEditor(texto);
    });
}

socket.on("usuario_ja_no_documento", () => {
    alert("Documento ja aberto em outra pagina");
    window.location.href = "/";
});

socket.on("usuarios_no_documento", atualizarInterfaceUsuarios);

function emitirTextoEditor(dados) {
    socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
    atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(nome) {
    socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
    alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
