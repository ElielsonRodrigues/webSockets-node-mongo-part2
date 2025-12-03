const conexoesDocumentos = [];

function encontrarConexao(nomeDocumento, nomeUsuario) {
    return conexoesDocumentos.find((conexao) => {
        return (
            conexao.nomeDocumento === nomeDocumento &&
            conexao.nomeUsuario === nomeUsuario
        );
    });
}

function adicionarConexao(conexao) {
    conexoesDocumentos.push(conexao);
    //console.log(conexoesDocumentos);
}

function obterUsuariosDocumento(nomeDocumento) {
    return conexoesDocumentos
        .filter((conexao) => conexao.nomeDocumento === nomeDocumento)
        .map((conexao) => conexao.nomeUsuario);
}

function removerConexao(nomeDocumento, nomeUsuario) {
    const indice = conexoesDocumentos.findIndex((conexao) => {
        return (
            conexao.nomeDocumento === nomeDocumento &&
            conexao.nomeUsuario === nomeUsuario
        );
    });

    //CASO NÃO ENCONTRAR NENHUM ITEM
    if (indice !== -1) {
        conexoesDocumentos.splice(indice, 1);
    }
}
export {
    encontrarConexao,
    adicionarConexao,
    obterUsuariosDocumento,
    removerConexao,
};
