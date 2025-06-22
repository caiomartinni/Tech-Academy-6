import request from "supertest";
import express from "express";
import carRoutes from "../routes/carRoutes";
import CarController from "../controllers/carController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateCar } from "../middleware/validationMiddleware";

jest.mock("../controllers/carController");
jest.mock("../middleware/authMiddleware");
jest.mock("../middleware/validationMiddleware");

const app = express();
app.use(express.json());
app.use("/", carRoutes);

describe("carRoutes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /cars", () => {
        it("should call CarController.getAllCars", async () => {
            (CarController.getAllCars as jest.Mock).mockImplementation((req, res) => res.status(200).json([{ id: 1 }]));
            const res = await request(app).get("/cars");
            expect(CarController.getAllCars).toHaveBeenCalled();
            expect(res.status).toBe(200);
            expect(res.body).toEqual([{ id: 1 }]);
        });
    });

    describe("GET /cars/:id", () => {
        it("should call CarController.getCarById", async () => {
            (CarController.getCarById as jest.Mock).mockImplementation((req, res) => res.status(200).json({ id: req.params.id }));
            const res = await request(app).get("/cars/123");
            expect(CarController.getCarById).toHaveBeenCalled();
            expect(res.status).toBe(200);
            expect(res.body).toEqual({ id: "123" });
        });
    });

    describe("PUT /cars/:id", () => {
        it("should call validateCar and CarController.updateCar", async () => {
            (validateCar as jest.Mock).mockImplementation((req, res, next) => next());
            (CarController.updateCar as jest.Mock).mockImplementation((req, res) => res.status(200).json({ updated: true }));
            const res = await request(app).put("/cars/123").send({ name: "Test" });
            expect(validateCar).toHaveBeenCalled();
            expect(CarController.updateCar).toHaveBeenCalled();
            expect(res.status).toBe(200);
            expect(res.body).toEqual({ updated: true });
        });
    });

    describe("POST /cars", () => {
        it("should call authMiddleware, validateCar, and CarController.createCar", async () => {
            (authMiddleware as jest.Mock).mockImplementation((req, res, next) => next());
            (validateCar as jest.Mock).mockImplementation((req, res, next) => next());
            (CarController.createCar as jest.Mock).mockImplementation((req, res) => res.status(201).json({ created: true }));
            const res = await request(app).post("/cars").send({ name: "Test" });
            expect(authMiddleware).toHaveBeenCalled();
            expect(validateCar).toHaveBeenCalled();
            expect(CarController.createCar).toHaveBeenCalled();
            expect(res.status).toBe(201);
            expect(res.body).toEqual({ created: true });
        });
    });

    describe("DELETE /cars/:id", () => {
        it("should call authMiddleware and CarController.deleteCarById", async () => {
            (authMiddleware as jest.Mock).mockImplementation((req, res, next) => next());
            (CarController.deleteCarById as jest.Mock).mockImplementation((req, res) => res.status(204).send());
            const res = await request(app).delete("/cars/123");
            expect(authMiddleware).toHaveBeenCalled();
            expect(CarController.deleteCarById).toHaveBeenCalled();
            expect(res.status).toBe(204);
        });
    });
});