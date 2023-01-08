import * as requesterService from "./requesterService";

export const createUsuario = async (usuario) => {
  const novoUsuario = await requesterService
    .createUsuario(usuario)
    .then((res) => {
      return res;
    })
    .catch((error) => console.warn(error));
  return novoUsuario;
};
