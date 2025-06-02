import { Request, Response } from "express";
import UserModel from "../models/UserModel";

class UserController {
  async getAllUsers(req: Request, res: Response) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    const users = await UserModel.findAndCountAll({
      limit: parseInt(limit as string),
      offset,
    });

    res.status(200).json({
      total: users.count,
      pages: Math.ceil(users.count / parseInt(limit as string)),
      data: users.rows,
    });
  }

  async getUserById(req: Request<{ id: string }>, res: Response) {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, cpf } = req.body;

      if (!name || !email || !password || !cpf) {
        return res.status(400).json({ error: "Values required" });
      }

      if (!UserModel.validateCPF(cpf)) {
        return res.status(400).json({ error: "Invalid CPF" });
      }

      const user = await UserModel.create({ name, email, password, cpf });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error: " + error });
    }
  }

  async updateUser(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      const { user } = req.body; // Usuário autenticado
      if (parseInt(id) !== user.id) {
        return res.status(403).json({ error: "You can only edit your own profile" });
      }

      const { name, password, email } = req.body;

      const userToUpdate = await UserModel.findByPk(id);
      if (!userToUpdate) {
        return res.status(404).json({ error: "User not found" });
      }

      if (email && email !== userToUpdate.email) {
        return res.status(400).json({ error: "Email cannot be changed" });
      }

      userToUpdate.name = name || userToUpdate.name;
      userToUpdate.password = password || userToUpdate.password;

      await userToUpdate.save();
      res.status(200).json(userToUpdate);
    } catch (error) {
      res.status(500).json({ error: "Internal server error: " + error });
    }
  }

  async deleteUser(req: Request<{ id: string }>, res: Response) {
    try {
      const user = await UserModel.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await user.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error: " + error });
    }
  }
}

export default new UserController();
