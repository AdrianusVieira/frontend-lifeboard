import api from "./api";

//usuario
export const createUsuario = (usuario) => api.post("/usuario", usuario);
export const getUsuarioByEmail = (email) => api.get(`/usuario/${email}`);
export const updateUsuarioByEmail = (email, usuario) =>
  api.put(`/usuario/${email}`, usuario);
export const deleteUsuarioByEmail = (email) => api.delete(`/usuario/${email}`);

//carteira
export const createCarteira = (carteira) => api.post("/carteira", carteira);

//fundo
export const createFundo = (fundo) => api.post("/fundo", fundo);