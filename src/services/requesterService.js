import api from "./api";

//usuario
export const createUsuario = (usuario) => api.post("/usuario", usuario);
export const getUsuarioByEmail = (email) => api.get(`/usuario/${email}`);
export const updateUsuarioByEmail = (email, usuario) =>
  api.put(`/usuario/${email}`, usuario);
export const deleteUsuarioByEmail = (email) => api.delete(`/usuario/${email}`);

//carteira
export const createCarteira = (carteira) => api.post("/carteira", carteira);
export const getCarteirasByUsuario = (id) => api.get(`/carteira/${id}`);
export const updateCarteiraById = (id, carteira) =>
  api.put(`/carteira/${id}`, carteira);
export const deleteCarteiraById = (id) => api.delete(`/carteira/${id}`);
//fundo
export const createFundo = (fundo) => api.post("/fundo", fundo);
export const getFundosByUsuario = (id) => api.get(`/fundo/${id}`);
export const updateFundoById = (id, fundo) => api.put(`/fundo/${id}`, fundo);
export const deleteFundoById = (id) => api.delete(`/fundo/${id}`);
//movimentacoes
export const createMovimentacao = (movimentacao) =>
  api.post("/movimentacao", movimentacao);
export const getMovimentacoesByCarteira = (id_carteira) =>
  api.get(`/movimentacaocarteira/${id_carteira}`);
export const getMovimentacoesByFundo = (id_fundo) =>
  api.get(`/movimentacaofundo/${id_fundo}`);
export const getMovimentacoesByInvestimento = (id_investimento) =>
  api.get(`/movimentacaoinvestimento/${id_investimento}`);
//investimentos
export const createInvestimento = (investimento) =>
  api.post("/investimento", investimento);
export const getInvestimentosByCategoria = (categoria) =>
  api.get(`/investimentocategoria/${categoria}`);
export const getInvestimentosByUsuario = (id) =>
  api.get(`/investimentousuario/${id}`);
export const updateInvestimentoById = (id, investimento) =>
  api.put(`/investimento/${id}`, investimento);
export const deleteInvestimentoById = (id) => api.delete(`/investimento/${id}`);
