
function definirCookie(chave, tokenJwt) {
    //salvando jwt no cookie do navegador
    document.cookie = `${chave}=${tokenJwt};path=/`;
}


function obterCookie(chave) {
    //capturando o valor do cookie de acordo com a chave passada
    return document.cookie.
        split("; ").
        find((cookie) => cookie.startsWith(`${chave}=`))?.
        split("=")[1];
}

function removerCookie(chave) {
    //removendo cookie de acordo com a chave passada
    return document.cookie = `${chave}=; expires=Thu, 01 Jan 1970 00:00:00 `;
}

export { definirCookie, obterCookie, removerCookie };