import "dotenv/config";

import io from "./servidor.js";
import registrarEventosInicio from "./registrar-eventos/inicio.js";
import registrarEventosDocumento from "./registrar-eventos/documento.js";
import registrarEventosCadastro from "./registrar-eventos/cadastro.js";
import registrarEventosLogin from "./registrar-eventos/login.js";


io.on("connection", (socket) => {
  registrarEventosInicio(socket, io);
  registrarEventosLogin(socket, io);
  registrarEventosDocumento(socket, io);
  registrarEventosCadastro(socket, io);
});
