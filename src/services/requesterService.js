import api from "./api";

export const createUsuario = (usuario) => api.post("/usuario", usuario);
