import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

let naverUser = null;
let kakaoUser = null;

export const getNaverData = (req, res) => {
  if (naverUser == null) {
    return res.send(null);
  }
  return res.send(naverUser);
};

export const getKakaoData = (req, res) => {
  if (kakaoUser == null) {
    return res.send(null);
  }
  return res.send(kakaoUser);
};

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

export const startNaverLogin = (req, res) => {
  const baseUrl = "https://nid.naver.com/oauth2.0/authorize";
  const config = {
    response_type: "code",
    client_id: process.env.NV_CLIENT,
    redirect_uri: process.env.NV_REDIRECT_URI,
    state: process.env.NV_STATE,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishNaverLogin = async (req, res) => {
  const baseUrl = "https://nid.naver.com/oauth2.0/token";
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.NV_CLIENT,
    client_secret: process.env.NV_SECRET,
    code: req.query.code,
    state: req.query.state,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequset = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/html;charset=utf-8",
      },
    })
  ).json();
  if ("access_token" in tokenRequset) {
    const { access_token } = tokenRequset;
    const apiUrl = "https://openapi.naver.com";
    const userData = await (
      await fetch(`${apiUrl}/v1/nid/me`, {
        method: "POST",
        headers: {
          "Content-Type": "text/html;charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    let user = await User.findOne({ email: userData.response.email });
    if (!user) {
      user = await User.create({
        name: userData.response.name,
        username: userData.response.nickname,
        email: userData.response.email,
        password: "",
      });
    }
    req.session.sessionId = req.session.id;
    req.session.loggedIn = true;
    req.session.user = user;
    naverUser = req.session;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const startKakaoLogin = (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id: process.env.KK_CLIENT,
    redirect_uri: process.env.KK_REDIRECT_URI,
    response_type: "code",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.send(finalUrl);
};

export const finishKakaoLogin = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    client_id: process.env.KK_CLIENT,
    redirect_uri: process.env.KK_REDIRECT_URI,
    grant_type: "authorization_code",
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequset = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequset) {
    const { access_token } = tokenRequset;
    const apiUrl = "https://kapi.kakao.com";
    const userData = await (
      await fetch(`${apiUrl}/v2/user/me`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();

    let user = await User.findOne({ email: userData.kakao_account.email });
    if (!user) {
      user = await User.create({
        name: userData.kakao_account.profile.nickname,
        username: userData.kakao_account.profile.nickname,
        email: userData.kakao_account.email,
        password: "",
      });
    }
    req.session.sessionId = req.session.id;
    req.session.loggedIn = true;
    req.session.user = user;
    naverUser = req.session;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const getLogout = async (req, res) => {
  try {
    naverUser = null;
    req.session.loggedIn = false;
    req.session.destroy();
    return res.send("/");
  } catch (error) {
    res.status(400).json({ message: "there was some error", error });
  }
};
