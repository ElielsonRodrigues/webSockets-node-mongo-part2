import { scryptSync, timingSafeEqual } from "crypto"

function autenticarUsuario(senha, usuario) {

    // compara com o salSenha de 64 bits que foi gerado e armazendo no banco
    const hashTeste = scryptSync(senha, usuario.salSenha, 64);

    // realiza a conversão do hash da senha para hexadecimal
    const hashReal = Buffer.from(usuario.hashSenha, "hex");

    // realiza a comparação de dois hash, o que foi digitado e o que esta no banco
    const autenticado = timingSafeEqual(hashTeste, hashReal);

    // retorna um boolean
    return autenticado;

}

export default autenticarUsuario;