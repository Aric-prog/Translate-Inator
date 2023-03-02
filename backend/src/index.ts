import express from "express";
import { Container } from "inversify";
import "reflect-metadata";
import "./todo/controller/AuthController.js";
import  "./todo/service/AuthService.js";
import { InversifyExpressServer } from "inversify-express-utils";
import { errorHandler } from "./middleware/ErrorHandler.js";
import AuthService from "./todo/service/AuthService.js";
import AuthRepository from "./todo/repository/AuthRepository.js";
import DbService from "./database/db.js";

import * as dotenv from 'dotenv';
import { fileURLToPath } from "url";
import path from "path";


export default class App {
    private readonly container: Container;
    
    constructor() {
        this.container = new Container();
        this.bindService();
        this.setup();
    }
    
    bindService() : void{
        this.container.bind(DbService).toSelf();
        this.container.bind(AuthRepository).toSelf();
        this.container.bind(AuthService).toSelf();
    }
    
    async setup(){
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        dotenv.config({path: __dirname + '/.env'});

        const dbService : DbService = this.container.get(DbService);
        const server: InversifyExpressServer = new InversifyExpressServer(this.container);
        
        // Tests connection
        const conn = await dbService.db.connect();
        conn.release();
        
        server.setConfig((app) => {
            app.use(express.json());
        });
        server.setErrorConfig((app) => {
            app.use(errorHandler);
        });
        const app = server.build();
        app.listen(process.env.PORT, () => {
            console.log("Server is running at PORT : " + process.env.PORT);
        });
    }
}
new App();

