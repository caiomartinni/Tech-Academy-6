import express from "express";
import UserController from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateUser } from "../middleware/validationMiddleware";

const router = express.Router();

router.post("/users", validateUser, UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", authMiddleware, UserController.getUserById);
router.put("/users/:id", authMiddleware, validateUser, UserController.updateUser);
router.delete("/users/:id", authMiddleware, UserController.deleteUser);

export default router;
