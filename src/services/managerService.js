import * as requesterService from "./requesterService";

//usuario
export const createUsuario = async (usuario) => {
  const newUsuario = await requesterService
    .createUsuario(usuario)
    .then((res) => {
      return res;
    })
    .catch((error) => console.warn(error));
  return newUsuario;
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

export const updateUsuarioByEmail = async (email, usuario) => {
  const newUsuario = await requesterService
    .updateUsuarioByEmail(email, usuario)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));
  return newUsuario;
};

export const updateFotoUsuario = async (email, foto) => {
  const usuario = { foto: foto };
  const newUsuario = await requesterService.updateUsuarioByEmail(email, usuario)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));

  return newUsuario;
};

export const deleteUsuarioByEmail = async (email) => {
  const result = await requesterService
    .deleteUsuarioByEmail(email)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));
  return result
};