import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";

const SECRET = "seuSegredoSuperSeguro";

export const generateToken = (user: UserModel) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};
