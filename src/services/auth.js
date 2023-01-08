export const CHAVE_EMAIL = "@lifeboard-Email";

export const login = (email) => {
  sessionStorage.setItem(CHAVE_EMAIL, email);
};
export const getEmail = () => sessionStorage.getItem(CHAVE_EMAIL);