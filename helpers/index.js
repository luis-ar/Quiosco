import bcrypt from "bcryptjs";

export const formatearDinero = (cantidad) => {
  return cantidad.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
  });
};
export const validarCorreo = (correo) => {
  const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return expresionRegularCorreo.test(correo);
};
export const validarPassword = (password) => {
  return password.length >= 6;
};
export const encriptarPassword = (password) => {
  return bcrypt.hash(password, 10);
};
