import express from "express";
import { loginUser } from "../controllers/loginController";
import { validateLogin } from "../middleware/validationMiddleware";

const router = express.Router();

router.post("/login", validateLogin, loginUser);

export default router;