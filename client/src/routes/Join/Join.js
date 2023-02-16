import styles from "./Join.module.scss";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

function Join() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const history = useHistory();
  const [reAuthNum, setReAuthNum] = useState(null);
  const [isAuthNum, setIsAuthNum] = useState(false);

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

  const handlePassword2 = (e) => {
    e.preventDefault();
    setPassword2(e.target.value);
  };

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleReAuthNum = (e) => {
    e.preventDefault();
    setReAuthNum(e.target.value);
  };

  const handleEmailCheck = async (e) => {
    if (!email) {
      window.alert("이메일을 입력해주세요.");
    } else {
      let body = {
        email: email,
      };
      axios.post(
        "/api/users/email",
        body,
        { withCredentials: true },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  };

  const handleAuthNumCheck = () => {
    if (!reAuthNum) {
      window.alert("인증번호를 입력해주세요.");
    } else {
      let body = {
        reAuthNum,
      };
      axios
        .post(
          "/api/users/email/check",
          body,
          { withCredentials: true },
          {
            header: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data == true) {
            setIsAuthNum(true);
          }
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuthNum) {
      let body = {
        id: id,
        password: password,
        password2: password2,
        username: username,
        email: email,
      };
      axios
        .post(
          "/api/users/join",
          body,
          { withCredentials: true },
          {
            header: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data === "complete") {
            handleUseHistory();
          }
          setStatus(res.data);
        });
    } else {
      window.alert("이메일을 인증해주세요.");
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
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
              placeholder="아이디"
              name="id"
              type="text"
              required
              onChange={handleId}
            ></input>
          </div>
          <input
            className={styles.content}
            placeholder="비밀번호"
            name="password"
            type="password"
            required
            onChange={handlePassword}
          ></input>
          <input
            className={styles.content}
            placeholder="비밀번호 재확인"
            name="password2"
            type="password"
            required
            onChange={handlePassword2}
          ></input>
          <input
            className={styles.content}
            placeholder="이름"
            name="name"
            type="text"
            required
            onChange={handleUsername}
          ></input>

          <div className={`${styles.emailWrapper} `}>
            <input
              className={styles.email}
              placeholder="이메일"
              name="email"
              type="email"
              required
              onChange={handleEmail}
            ></input>

            <div className={styles.emailCheckBtn} onClick={handleEmailCheck}>
              인증번호받기
            </div>
          </div>

          <div className={`${styles.emailWrapper} `}>
            <input
              className={styles.content}
              placeholder="인증번호 6자리"
              required
              onChange={handleReAuthNum}
            ></input>

            <div>
              {isAuthNum ? (
                <div className={styles.emailCheckBtn}>✅</div>
              ) : (
                <div
                  className={styles.emailCheckBtn}
                  onClick={handleAuthNumCheck}
                >
                  인증
                </div>
              )}
            </div>
          </div>

          <input
            className={`${styles.content} ${styles.content__submit}`}
            value="회원가입"
            name="submit"
            type="submit"
          ></input>
          <div className={styles.status} onChange={handleStatusChange}>
            {status}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Join;
