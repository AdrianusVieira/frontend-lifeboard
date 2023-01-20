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
export const getMovimentacoesByCarteira = async (id) => {
  const movimentacoes = await requesterService
    .getMovimentacoesByCarteira(id)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));

  return movimentacoes;
};
export const getMovimentacoesByFundo = async (id) => {
  const movimentacoes = await requesterService
    .getMovimentacoesByFundo(id)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));

  return movimentacoes;
};
export const getMovimentacoesByInvestimento = async (id) => {
  const movimentacoes = await requesterService
    .getMovimentacoesByInvestimento(id)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));

  return movimentacoes;
};
//investimento
export const createInvestimento = async (investimento) => {
  const newInvestimento = await requesterService
    .createInvestimento(investimento)
    .then((res) => {
      return res;
    })
    .catch((error) => console.warn(error));
  return newInvestimento;
};
export const getInvestimentosByCategoria = async (categoria) => {
  const investimentos = await requesterService
    .getInvestimentosByCategoria(categoria)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));

  return investimentos;
};
export const updateInvestimentoById = async (id, investimento) => {
  const newInvestimento = await requesterService
    .updateInvestimentoById(id, investimento)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));

  return newInvestimento;
};
export const deleteInvestimentoById = async (id) => {
  const result = await requesterService
    .deleteInvestimentoById(id)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.warn(error));
  return result;
};