import express from "express";
import { postJoin } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/join", postJoin);

export default userRouter;
