import * as requesterService from "./requesterService";

//usuario
export const createUsuario = async (usuario) => {
  const novoUsuario = await requesterService
    .createUsuario(usuario)
    .then((res) => {
      return res;
    })
    .catch((error) => console.warn(error));
  return novoUsuario;
};

export const getUsuarioByEmail = async (email) => {
  const usuario = await requesterService
    .getUsuarioByEmail(email)
    .then((res) => {
      return res.data[0];
    })
    .catch((error) => console.warn(error));
  return usuario;
};
