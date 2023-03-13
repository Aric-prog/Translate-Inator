import express from "express";
import "reflect-metadata";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { errorHandler } from "./middleware/ErrorHandler.js";
import { fileURLToPath } from "url";

import cors from "cors";
import path from "path";
import * as dotenv from "dotenv";

import DbService from "./database/db.js";
import TranslateService from "./todo/service/TranslateService.js";

import AuthRepository from "./todo/repository/AuthRepository.js";
import TodoRepository from "./todo/repository/TodoRepository.js";

import AuthService from "./todo/service/AuthService.js";
import TodoService from "./todo/service/TodoService.js";

import "./todo/controller/TranslateController.js";
import "./todo/controller/TodoController.js";
import "./todo/controller/AuthController.js";

export default class App {
    private readonly container: Container;

    constructor() {
        this.container = new Container();
        this.bindService();
        this.setup();
    }

    bindService(): void {
        // External services
        this.container.bind(DbService).toSelf();
        this.container.bind(TranslateService).toSelf();

        // Internal services
        this.container.bind(AuthRepository).toSelf();
        this.container.bind(TodoRepository).toSelf();
        this.container.bind(TodoService).toSelf();
        this.container.bind(AuthService).toSelf();
    }

    async setup() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const ROUTE_PREPEND = process.env.BACKEND_ROUTE_PREPEND;

        dotenv.config({ path: __dirname + "/.env" });
        const server: InversifyExpressServer = new InversifyExpressServer(
            this.container
        );

        server.setConfig((app) => {
            app.use(cors());
            app.use(express.json());
        });
        server.setErrorConfig((app) => {
            app.use(errorHandler);
        });

        // Tests db connection
        const dbService: DbService = this.container.get(DbService);
        const conn = await dbService.pool.connect();
        conn.release();

        const app = server.build();

        app.listen(process.env.BACKEND_PORT || 8000, () => {
            console.log("Server is running at PORT : " + (process.env.BACKEND_PORT || 8000));
        });
    }
}
new App();
