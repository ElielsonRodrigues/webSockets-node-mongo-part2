import jwt from "jsonwebtoken";

function autorizarUsuario(socket, next) {

    const tokenJwt = socket.handshake.auth.token;
    //console.log(tokenJwt);
    try {
        //console.log(process.env.SECRET_JWT)
        jwt.verify(tokenJwt, process.env.SECRET_JWT);
        next();
    } catch (erro) {
        next(erro);
    }
    
}

export default autorizarUsuario;