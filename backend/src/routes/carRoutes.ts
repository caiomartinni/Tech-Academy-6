import express from "express";
import CarController from "../controllers/carController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateCar } from "../middleware/validationMiddleware";

const router = express.Router();

router.get("/cars", CarController.getAllCars);
router.get("/cars/:id", CarController.getCarById);
router.put("/cars/:id", validateCar, CarController.updateCar);
router.post("/cars", authMiddleware, validateCar, CarController.createCar);
router.delete("/cars/:id", authMiddleware, CarController.deleteCarById);

export default router;