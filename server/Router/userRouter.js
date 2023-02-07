import express from "express";
import {
  postJoin,
  postLogin,
  getLogout,
  startNaverLogin,
  finishNaverLogin,
  getNaverData,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/join", postJoin);
userRouter.post("/login", postLogin);
userRouter.get("/logout", getLogout);
userRouter.get("/naver/start", startNaverLogin);
userRouter.get("/naver/finish", finishNaverLogin);
userRouter.get("/naver/data", getNaverData);

export default userRouter;
