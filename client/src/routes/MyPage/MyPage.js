import styles from "./MyPage.module.scss";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState, loginState } from "../../recoil";

function MyPage() {
  const [user, setUser] = useRecoilState(userState);

  return (
    <div>
      <Header></Header>
      <div className={styles.wrapper}>
        <div className={styles.profile}>
          <div className={styles.image}>😄</div>
          <div>
            <span className={styles.content}>{user.username}</span>
            <span className={styles.content}>설정</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
