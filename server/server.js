import express from "express";
import session from "express-session";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import cors from "cors";
import userRouter from "./Router/userRouter.js";
import User from "./models/User.js";
import mongoose from "mongoose";

const app = express();
const db = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/webtoon");

app.use(
  session({
    secret: "sadasd229sa",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/webtoon" }),
    cookie: { maxAge: 3.6e6 * 24 },
  })
);

app.use("/api/users", userRouter);

function main() {
  const handleOpen = () => console.log("✅ Connected to DB");
  const handleError = (error) => console.log("❌ DB Error", error);
  db.on("error", handleError);
  db.once("open", handleOpen);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main();

const port = 5000; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
