import request from "supertest";
import express from "express";
import brandRouter from "../routes/brandRoutes";

// Mocks dos middlewares e controllers
jest.mock("../controllers/brandController", () => ({
  getAllBrands: jest.fn((req, res) => res.status(200).json([{ id: 1, name: "Nike" }])),
  getBrandById: jest.fn((req, res) => res.status(200).json({ id: req.params.id, name: "Nike" })),
  createBrand: jest.fn((req, res) => res.status(201).json({ id: 2, ...req.body })),
  deleteBrandById: jest.fn((req, res) => res.status(204).send()),
  updateBrandById: jest.fn((req, res) => res.status(200).json({ id: req.params.id, ...req.body })),
}));
jest.mock("../middleware/authMiddleware", () => ({
  authMiddleware: (req: any, res: any, next: any) => next(),
}));
jest.mock("../middleware/validationMiddleware", () => ({
  validateBrand: (req: any, res: any, next: any) => next(),
}));

const app = express();
app.use(express.json());
app.use("/", brandRouter);

describe("Brand Routes", () => {
  it("GET /brands should return all brands", async () => {
    const res = await request(app).get("/brands");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /brands/:id should return a brand by id", async () => {
    const res = await request(app).get("/brands/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", "1");
  });

  it("POST /brands should create a brand", async () => {
    const res = await request(app)
      .post("/brands")
      .send({ name: "Adidas" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("name", "Adidas");
  });

  it("PUT /brands/:id should update a brand", async () => {
    const res = await request(app)
      .put("/brands/1")
      .send({ name: "Puma" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "Puma");
  });

  it("DELETE /brands/:id should delete a brand", async () => {
    const res = await request(app).delete("/brands/1");
    expect(res.status).toBe(204);
  });
});