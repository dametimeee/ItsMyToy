import styles from "./Setting.module.scss";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState, loginState } from "../../recoil";

function Setting() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [status, setStatus] = useState(null);
  const [user, setUser] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const history = useHistory();

  function handleUseHistory() {
    history.push("/");
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    let body = {
      oldPassword,
      newPassword,
      newPasswordConfirmation,
    };
    await axios
      .post("/api/users/password/change", body, { withCredentials: true })
      .then((res) => {
        if (res.data == "complete") {
          axios
            .get("/api/users/logout", { withCredentials: true })
            .then((res) => {
              history.push(res.data);
            });
          setUser(null);
          setIsLogin(false);
        }
        setStatus(res.data);
      });
  };

  const handleOldPassword = (e) => {
    e.preventDefault();
    setOldPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    e.preventDefault();
    setNewPassword(e.target.value);
  };

  const handleNewPasswordConfirmation = (e) => {
    e.preventDefault();
    setNewPasswordConfirmation(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleChangePassword}>
          <input
            className={styles.content}
            placeholder="현재 비밀번호"
            type="password"
            required
            onChange={handleOldPassword}
          ></input>
          <input
            className={styles.content}
            placeholder="새 비밀번호"
            type="password"
            required
            onChange={handleNewPassword}
          ></input>
          <input
            className={styles.content}
            placeholder="새 비밀번호 확인"
            type="password"
            required
            onChange={handleNewPasswordConfirmation}
          ></input>
          <input
            className={`${styles.content} ${styles.content__submit}`}
            type="submit"
            value="변경"
          ></input>
          <div className={styles.status} onChange={handleStatusChange}>
            {status}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Setting;
