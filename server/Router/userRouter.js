import express from "express";
import {
  postJoin,
  postLogin,
  getLogout,
  startNaverLogin,
  finishNaverLogin,
  startKakaoLogin,
  finishKakaoLogin,
  getNaverData,
  getKakaoData,
  getSendEmail,
  checkAuthNum,
  changePassword,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/join", postJoin);
userRouter.post("/login", postLogin);
userRouter.get("/logout", getLogout);
userRouter.get("/naver/start", startNaverLogin);
userRouter.get("/naver/finish", finishNaverLogin);
userRouter.get("/kakao/start", startKakaoLogin);
userRouter.get("/kakao/finish", finishKakaoLogin);
userRouter.get("/naver/data", getNaverData);
userRouter.get("/kakao/data", getKakaoData);
userRouter.post("/email", getSendEmail);
userRouter.post("/email/check", checkAuthNum);
userRouter.post("/password/change", changePassword);

export default userRouter;
