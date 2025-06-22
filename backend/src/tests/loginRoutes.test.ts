import { Request, Response, NextFunction } from "express";
import request from "supertest";
import express from "express";
import loginRoutes from "../routes/loginRoutes";

describe("POST /login", () => {
    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    it("should call validateLogin middleware and loginUser controller", async () => {
        jest.resetModules();
        jest.doMock("../controllers/loginController", () => ({
            loginUser: (req: Request, res: Response) => res.status(200).json({ message: "Login successful" }),
        }));
        jest.doMock("../middleware/validationMiddleware", () => ({
            validateLogin: (req: Request, res: Response, next: NextFunction) => next(),
        }));

        const express = require("express");
        const request = require("supertest");
        const loginRoutes = require("../routes/loginRoutes").default;

        const app = express();
        app.use(express.json());
        app.use("/", loginRoutes);

        const response = await request(app)
            .post("/login")
            .send({ username: "testuser", password: "testpass" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Login successful" });
    });

    it("should return 400 if validateLogin fails", async () => {
        jest.resetModules();
        jest.doMock("../controllers/loginController", () => ({
            loginUser: (req: Request, res: Response) => res.status(200).json({ message: "Login successful" }),
        }));
        jest.doMock("../middleware/validationMiddleware", () => ({
            validateLogin: (req: Request, res: Response, next: NextFunction) => res.status(400).json({ error: "Invalid input" }),
        }));

        const express = require("express");
        const request = require("supertest");
        const loginRoutes = require("../routes/loginRoutes").default;

        const app = express();
        app.use(express.json());
        app.use("/", loginRoutes);

        const response = await request(app)
            .post("/login")
            .send({ username: "", password: "" });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Invalid input" });
    });

    it("should return 500 if loginUser throws an error", async () => {
        jest.resetModules();
        jest.doMock("../controllers/loginController", () => ({
            loginUser: (req: Request, res: Response) => res.status(500).json({ error: "Internal server error" }),
        }));
        jest.doMock("../middleware/validationMiddleware", () => ({
            validateLogin: (req: Request, res: Response, next: NextFunction) => next(),
        }));

        const express = require("express");
        const request = require("supertest");
        const loginRoutes = require("../routes/loginRoutes").default;

        const app = express();
        app.use(express.json());
        app.use("/", loginRoutes);

        const response = await request(app)
            .post("/login")
            .send({ username: "testuser", password: "testpass" });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Internal server error" });
    });
});