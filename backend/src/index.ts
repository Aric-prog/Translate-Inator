import express from "express";
import { Container } from "inversify";
import "reflect-metadata";
import "./todo/controller/AuthController.js";
import  "./todo/service/AuthService.js";
import { InversifyExpressServer } from "inversify-express-utils";
import { errorHandler } from "./middleware/ErrorHandler.js";
import AuthService from "./todo/service/AuthService.js";
import AuthRepository from "./todo/repository/AuthRepository.js";

const PORT = process.env.PORT || 8000;

export default class App {
    protected readonly container: Container;

    constructor() {
        this.container = new Container();
        this.bindService();
        this.setup();
    }

    bindService() : void{
        this.container.bind(AuthRepository).toSelf();
        this.container.bind(AuthService).toSelf();
    }

    setup(){
        const server: InversifyExpressServer = new InversifyExpressServer(this.container);
        server.setConfig((app) => {
            app.use(express.json());
        });
        server.setErrorConfig((app) => {
            app.use(errorHandler);
        });
        const app = server.build();
        app.listen(PORT, () => {
            console.log("Server is running at PORT : " + PORT);
        });
    }
}
new App();

