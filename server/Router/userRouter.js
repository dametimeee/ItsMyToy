import express from "express";
import {
  postJoin,
  postLogin,
  getLogout,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/join", postJoin);
userRouter.post("/login", postLogin);
userRouter.post("/logout", getLogout);

export default userRouter;
