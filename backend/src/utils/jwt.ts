import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";

const SECRET = "seuSegredoSuperSeguro"; // Mude isso para uma variável de ambiente!

export const generateToken = (user: UserModel) => {
  return jwt.sign(
    { id: user.id, email: user.email }, // Dados no token
    SECRET,
    { expiresIn: "1h" } // Token expira em 1 hora
  );
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};
