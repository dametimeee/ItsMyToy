import styles from "./MyPage.module.scss";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState, loginState } from "../../recoil";

function MyPage() {
  const [user, setUser] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const history = useHistory();

  function handleUseHistory() {
    history.push("/");
  }
  const handleLogoutClick = async () => {
    await axios.post("/api/users/logout", { withCredentials: true });
    setUser(null);
    setIsLogin(false);
    handleUseHistory();
  };

  return (
    <div>
      {isLogin ? (
        <div>
          <Header></Header>
          <div className={styles.wrapper}>
            <div className={styles.profile}>
              <div className={styles.image}>😄</div>
              <div>
                <span className={styles.content}>{user.username}</span>
                <span className={styles.content}>설정</span>
                <span className={styles.logout} onClick={handleLogoutClick}>
                  로그아웃
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>로그인을 해주세요.</div>
      )}
    </div>
  );
}

export default MyPage;
