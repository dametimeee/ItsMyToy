import styles from "./MyPage.module.scss";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState, loginState } from "../../recoil";

function MyPage() {
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

  const handleChangePassword = (req, res) => {
    axios.post("/api/users/password/change").then((res) => {});
  };
  return (
    <div>
      {isLogin ? (
        <div>
          <Header></Header>
          <div className={styles.wrapper}>
            <div className={styles.profile}>
              <img
                src={user.profileImage}
                className={styles.profileImage}
              ></img>
              <div className={styles.content}>{user.username}</div>
              <Link to="/setting" className={styles.content}>
                비밀번호 변경
              </Link>
              <div className={styles.content} onClick={handleLogoutClick}>
                로그아웃
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default MyPage;
