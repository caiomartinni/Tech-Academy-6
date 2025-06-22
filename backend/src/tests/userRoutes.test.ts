import request from "supertest";
import express from "express";

// Declare os mocks ANTES do jest.mock
const mockCreateUser = jest.fn((req, res) => res.status(201).json({ message: "Usuário criado" }));
const mockGetAllUsers = jest.fn((req, res) => res.status(200).json([{ id: 1, name: "Rick" }]));
const mockGetUserById = jest.fn((req, res) => res.status(200).json({ id: req.params.id, name: "Rick" }));
const mockUpdateUser = jest.fn((req, res) => res.status(200).json({ message: "Usuário atualizado" }));
const mockDeleteUser = jest.fn((req, res) => res.status(204).send());

jest.mock("../controllers/userController", () => ({
  __esModule: true,
  default: {
    createUser: mockCreateUser,
    getAllUsers: mockGetAllUsers,
    getUserById: mockGetUserById,
    updateUser: mockUpdateUser,
    deleteUser: mockDeleteUser,
  },
}));

const mockAuthMiddleware = jest.fn((req, res, next) => next());
jest.mock("../middleware/authMiddleware", () => ({
  authMiddleware: mockAuthMiddleware,
}));

const mockValidateUser = jest.fn((req, res, next) => next());
jest.mock("../middleware/validationMiddleware", () => ({
  validateUser: mockValidateUser,
}));

import userRoutes from "../routes/userRoutes"; // Import depois dos mocks

const app = express();
app.use(express.json());
app.use("/", userRoutes);

describe("User Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /users", () => {
    it("deve validar e criar usuário", async () => {
      const response = await request(app)
        .post("/users")
        .send({ name: "Rick", email: "rick@email.com" });

      expect(mockValidateUser).toHaveBeenCalled();
      expect(mockCreateUser).toHaveBeenCalled();
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: "Usuário criado" });
    });
  });

  describe("GET /users", () => {
    it("deve retornar todos os usuários", async () => {
      const response = await request(app).get("/users");
      expect(mockGetAllUsers).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: 1, name: "Rick" }]);
    });
  });

  describe("GET /users/:id", () => {
    it("deve autenticar e retornar usuário por id", async () => {
      const response = await request(app).get("/users/1");
      expect(mockAuthMiddleware).toHaveBeenCalled();
      expect(mockGetUserById).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: "1", name: "Rick" });
    });
  });

  describe("PUT /users/:id", () => {
    it("deve autenticar, validar e atualizar usuário", async () => {
      const response = await request(app)
        .put("/users/1")
        .send({ name: "Novo Nome" });

      expect(mockAuthMiddleware).toHaveBeenCalled();
      expect(mockValidateUser).toHaveBeenCalled();
      expect(mockUpdateUser).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Usuário atualizado" });
    });
  });

  describe("DELETE /users/:id", () => {
    it("deve autenticar e deletar usuário", async () => {
      const response = await request(app).delete("/users/1");
      expect(mockAuthMiddleware).toHaveBeenCalled();
      expect(mockDeleteUser).toHaveBeenCalled();
      expect(response.status).toBe(204);
    });
  });
});