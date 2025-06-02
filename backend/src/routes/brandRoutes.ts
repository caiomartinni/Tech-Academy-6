import express from "express";
import {
  getAllBrands,
  getBrandById,
  createBrand,
  deleteBrandById,
  updateBrandById,
} from "../controllers/brandController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateBrand } from "../middleware/validationMiddleware";

const router = express.Router();

router.get("/brands", getAllBrands);
router.get("/brands/:id", getBrandById);
router.put("/brands/:id", validateBrand, updateBrandById);
router.post("/brands", authMiddleware, validateBrand, createBrand);
router.delete("/brands/:id", authMiddleware, deleteBrandById);

export default router;
