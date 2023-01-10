import express from "express";
import userRouter from "./Router/userRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRouter);

const port = 5000; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
