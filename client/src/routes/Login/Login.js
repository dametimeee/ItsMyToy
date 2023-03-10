import styles from "./Login.module.scss";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState, loginState } from "../../recoil";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  let naverUrl = "";

  const history = useHistory();

  function handleUseHistory() {
    history.push("/");
  }

  const handleId = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let body = {
      id: id,
      password: password,
    };
    axios
      .post(
        "/api/users/login",
        body,
        { withCredentials: true },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
          setIsLogin(true);
          handleUseHistory();
        } else {
          setStatus(res.data);
        }
      });
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleNaverClick = async (req, res) => {
    await axios
      .get("/api/users/naver/start", { withCredentials: true })
      .then((res) => (window.location.href = res.data));
  };

  const handleKakaoClick = async (req, res) => {
    await axios
      .get("/api/users/kakao/start", { withCredentials: true })
      .then((res) => (window.location.href = res.data));
  };

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.title}>Ibagu</div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <input
              className={styles.content}
              placeholder="?????????"
              name="id"
              type="text"
              required
              onChange={handleId}
            ></input>
          </div>
          <input
            className={styles.content}
            placeholder="????????????"
            name="password"
            type="password"
            required
            onChange={handlePassword}
          ></input>
          <input
            className={`${styles.content} ${styles.content__submit}`}
            placeholder="?????????"
            name="submit"
            type="submit"
            required
          ></input>
          <div className={styles.bottom}>
            <div className={styles.bottom__left}>
              <span>????????? ??????</span>
              <span> / </span>
              <span>???????????? ??????</span>
            </div>
            <Link to="/Join">
              <div className={styles.bottom__right}>????????????</div>
            </Link>
          </div>
          <div className={styles.socialLogin}>
            <img
              src="https://user-images.githubusercontent.com/106083871/218301864-9d0fa374-44aa-4ab2-8cfd-b74452e8b04b.png"
              className={styles.naverLogin}
              onClick={handleNaverClick}
            ></img>
            <img
              src="https://t1.daumcdn.net/crms/symbol_img/symbol_%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1.png"
              className={styles.kakaoLogin}
              onClick={handleKakaoClick}
            ></img>
          </div>

          <div className={styles.status} onChange={handleStatusChange}>
            {status}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
