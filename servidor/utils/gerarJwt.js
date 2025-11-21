import jwt from "jsonwebtoken";

function gerarJwt(payload) {

    const tokenJwt = jwt.sign(payload, process.env.SECRET_JWT, {
        expiresIn: "1h" // pode ser passado da seguinte: 1h ou 2 days
    });

    return tokenJwt;

}

export default gerarJwt;