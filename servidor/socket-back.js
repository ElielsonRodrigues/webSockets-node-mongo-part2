import "dotenv/config";

import io from "./servidor.js";
import registrarEventosInicio from "./registrar-eventos/inicio.js";
import registrarEventosDocumento from "./registrar-eventos/documento.js";
import registrarEventosCadastro from "./registrar-eventos/cadastro.js";
import registrarEventosLogin from "./registrar-eventos/login.js";

import autorizarUsuario from "./middlewares/autorizarUsuario.js";

const nspUsuarios = io.of("/usuarios"); // capturando o name space de usuarios

nspUsuarios.use(autorizarUsuario);

nspUsuarios.on("connection", (socket) => {
  registrarEventosInicio(socket, nspUsuarios);
  registrarEventosDocumento(socket, nspUsuarios);
});

io.of("/").on("connection", (socket) => {
  registrarEventosLogin(socket, io);
  registrarEventosCadastro(socket, io);
});
