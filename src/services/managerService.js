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
  const newUsuario = await requesterService
    .updateUsuarioByEmail(email, usuario)
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
  return result;
};

//carteira
export const createCarteira = async (carteira) => {
  const newCarteira = await requesterService
    .createCarteira(carteira)
    .then((res) => {
      return res;
    })
    .catch((error) => console.warn(error));
  return newCarteira;
};
export const getCarteirasByUsuario = async (id) => {
  const carteiras = await requesterService
    .getCarteirasByUsuario(id)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));

  return carteiras;
};
export const updateCarteiraById = async (id, carteira) => {
  const newCarteira = await requesterService
    .updateCarteiraById(id, carteira)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));

  return newCarteira;
};
export const deleteCarteiraById = async (id) => {
  const result = await requesterService
    .deleteCarteiraById(id)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));
  return result;
};

//fundo
export const createFundo = async (fundo) => {
  const newFundo = await requesterService
    .createFundo(fundo)
    .then((res) => {
      return res;
    })
    .catch((error) => console.warn(error));
  return newFundo;
};
export const getFundosByUsuario = async (id) => {
  const fundos = await requesterService
    .getFundosByUsuario(id)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));

  return fundos;
};
export const updateFundoById = async (id, fundo) => {
  const newFundo = await requesterService
    .updateFundoById(id, fundo)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));

  return newFundo;
};
export const deleteFundoById = async (id) => {
  const result = await requesterService
    .deleteFundoById(id)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));
  return result;
};

//movimentacao 
export const createMovimentacao = async (movimentacao) => {
  const newMovimentacao = await requesterService
    .createMovimentacao(movimentacao)
    .then((res) => {
      return res;
    })
    .catch((error) => console.warn(error));
  return newMovimentacao;
};