import express from "express";
import * as AuthController from "./controller/AuthController.js";

const app = express();

app.use(express.json());
app.post("/signup", AuthController.signUp);

const server = app.listen("8000");
