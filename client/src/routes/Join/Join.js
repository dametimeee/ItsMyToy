import styles from "./Join.module.scss";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Join() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let body = {
      id: id,
      password: password,
      password2: password2,
      username: username,
      email: email,
    };
    axios
      .post("/api/users/join", body, {
        header: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data === "complete") {
          handleUseHistory();
        }
        setStatus(res.data);
      });
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.title}>ThisIsTitle</div>
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
          <input
            className={styles.content}
            placeholder="이메일"
            name="email"
            type="email"
            required
            onChange={handleEmail}
          ></input>
          <input
            className={`${styles.content} ${styles.content__submit}`}
            placeholder="회원가입"
            name="submit"
            type="submit"
            required
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
