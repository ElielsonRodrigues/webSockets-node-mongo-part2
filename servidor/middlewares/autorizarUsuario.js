import jwt from "jsonwebtoken";

function autorizarUsuario(socket, next) {

    const tokenJwt = socket.handshake.auth.token;
    //console.log(tokenJwt);
    try {
        //console.log(process.env.SECRET_JWT)
        const payLoadToken = jwt.verify(tokenJwt, process.env.SECRET_JWT);

        socket.emit("autorizar_sucesso", payLoadToken);

        next();
    } catch (erro) {
        next(erro);
    }

}

export default autorizarUsuario;