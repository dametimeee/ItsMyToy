import express from "express";
import { handleIsLogin } from "../middlewares.js";

const rootRouter = express.Router();

rootRouter.get("/", handleIsLogin);

export default rootRouter;
