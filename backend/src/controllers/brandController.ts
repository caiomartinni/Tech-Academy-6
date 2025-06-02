import { Request, Response } from "express";
import BrandModel from "../models/BrandModel";
import { errorMessages, successMessages } from "../utils/messages";

// Função auxiliar para validar entrada
const validateBrandData = (name: string): boolean => {
  return !!name;
};

// Função auxiliar para buscar uma marca por ID
const findBrandById = async (id: string) => {
  return await BrandModel.findByPk(id);
};

// Função auxiliar para validar e atualizar os dados de uma marca
const updateBrandData = async (brand: BrandModel, name: string) => {
  brand.name = name;
  await brand.save();
  return brand;
};

export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await BrandModel.findAll();
    res.status(200).json(brands);
  } catch (error) {
    console.error("Erro ao buscar marcas:", error);
    res.status(500).json({ error: errorMessages.internalError });
  }
};

export const getBrandById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brand = await BrandModel.findByPk(id);

    if (!brand) {
      return res.status(404).json({ error: errorMessages.notFound("Marca") });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error("Erro ao buscar marca por ID:", error);
    res.status(500).json({ error: errorMessages.internalError });
  }
};

export const createBrand = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!validateBrandData(name)) {
      return res
        .status(400)
        .json({ error: errorMessages.validationError("name") });
    }

    const newBrand = await BrandModel.create({ name });

    res.status(201).json({
      message: successMessages.created("Marca"),
      brand: newBrand,
    });
  } catch (error) {
    console.error("Erro ao cadastrar marca:", error);
    res.status(500).json({ error: errorMessages.internalError });
  }
};

export const deleteBrandById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const brand = await BrandModel.findByPk(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: errorMessages.notFound("Marca") });
    }
    await brand.destroy();
    res.status(200).json({ message: successMessages.deleted("Marca") });
  } catch (error) {
    res.status(500).json({ error: errorMessages.internalError });
  }
};

export const updateBrandById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!validateBrandData(name)) {
      return res
        .status(400)
        .json({ error: errorMessages.validationError("name") });
    }

    const brand = await findBrandById(id);

    if (!brand) {
      return res.status(404).json({ error: errorMessages.notFound("Marca") });
    }

    const updatedBrand = await updateBrandData(brand, name);

    res.status(200).json({
      message: successMessages.updated("Marca"),
      brand: updatedBrand,
    });
  } catch (error) {
    console.error("Erro ao atualizar marca:", error);
    res.status(500).json({ error: errorMessages.internalError });
  }
};
