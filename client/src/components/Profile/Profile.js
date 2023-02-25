import styles from "./Profile.module.scss";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState, loginState } from "../../recoil";
import { Link, useHistory } from "react-router-dom";

function Profile() {
  const [user, setUser] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const history = useHistory();

  const handleLogoutClick = (req, res) => {
    axios.get("/api/users/logout", { withCredentials: true }).then((res) => {
      history.push(res.data);
    });
    setUser(null);
    setIsLogin(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.profile__text}>
          <Link to="/MyPage">
            <div>마이페이지</div>
          </Link>
          <div className={styles.logout} onClick={handleLogoutClick}>
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
