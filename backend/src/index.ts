import express from "express";
import * as AuthController from "./todo/controller/AuthController.js";
import { errorHandler } from "./middleware/ErrorHandler.js";
import SignUpDTO from "./todo/dto/SignUpDTO.js";
import ValidateRequest from "./middleware/ValidateRequest.js";

const app = express();

app.use(express.json());
app.post(
    "/signup",
    ValidateRequest.using(SignUpDTO.validator),
    AuthController.signUp
);
app.post("/login", AuthController.login);
app.use(errorHandler);

const server = app.listen("8000");
