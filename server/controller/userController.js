import User from "../models/User.js";
import bcrypt from "bcrypt";

export const postJoin = async (req, res) => {
  const { id, password, password2, username, email } = req.body;
  if (password !== password2) {
    return res.send("비밀번호가 일치하지 않습니다.");
  }
  const isIdExists = await User.exists({ $or: [{ id }] });
  const isEmailExists = await User.exists({ $or: [{ email }] });

  if (isIdExists) {
    return res.send("사용 중인 아이디입니다.");
  }
  if (isEmailExists) {
    return res.send("사용 중인 이메일입니다.");
  }
  try {
    await User.create({
      id,
      password,
      password2,
      email,
      username,
    });
    res.send("complete");
  } catch {
    res.sendStatus(400);
  }
};

export const postLogin = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({ id });
  if (!user) {
    return res.send("등록된 아이디가 없습니다.");
  }
  const passwordOk = bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return res.send("비밀번호가 다릅니다.");
  }
  req.session.sessionId = req.session.id;
  req.session.loggedIn = true;
  req.session.user = user;
  res.send(req.session);
};

export const getLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ message: "there was some error", error });
  }
};
