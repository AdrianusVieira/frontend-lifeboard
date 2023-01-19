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

//fundo
export const createFundo = (fundo) => api.post("/fundo", fundo);
export const getFundosByUsuario = (id) => api.get(`/fundo/${id}`);
export const updateFundoById = (id, fundo) =>
  api.put(`/fundo/${id}`, fundo);

//movimentacoes
export const createMovimentacao = (movimentacao) => api.post("/movimentacao", movimentacao);