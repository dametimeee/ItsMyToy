import { useState, useRef } from "react";
import style from "./Header.module.scss";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { userState, loginState } from "../../recoil";
import { useRecoilState } from "recoil";
import axios from "axios";

function Header() {
  const [search, setSearch] = useState("");
  const searchBtn = useRef();
  const [user, setUser] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const handleSearchChange = (event) => {
    const {
      target: { value },
    } = event;
    setSearch(value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      searchBtn.current.click();
    }
  };

  const handleLogoutClick = async () => {
    await axios.post("/api/users/logout", { withCredentials: true });
    setUser(null);
    setIsLogin(false);
    return;
  };

  const handleProfileClick = () => {};
  return (
    <div>
      <div className={style.header__wrapper}>
        <div className={style.header__left}>
          <div>
            <FontAwesomeIcon
              icon={faBars}
              size={"xl"}
              className={style.header__icon__bar}
            />
          </div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className={style.header__title}>ThisIsTitle</div>
          </Link>
        </div>
        <div className={style.header__right}>
          <div>
            <div className={style.search__box}>
              <input
                id="searchLabel"
                type="text"
                name="search"
                placeholder="제목 / 작가로 검색할 수 있습니다."
                onChange={handleSearchChange}
                onKeyDown={handleEnterKeyPress}
                value={search}
              />
              <Link
                to={{
                  pathname: `/search/${encodeURI(encodeURIComponent(search))}`,
                  state: { search },
                }}
              >
                <span ref={searchBtn}>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    size={"1x"}
                    style={{ fontSize: "15px" }}
                  />
                </span>
              </Link>
            </div>
          </div>

          {isLogin ? (
            <div>
              <div className={style.loginBox}>
                <Link to={"/MyPage"} style={{ textDecoration: "none" }}>
                  <span className={style.loginBox__image}>😄</span>
                </Link>
                {/* <span className={style.loginBox__username}>
                  {user.username}
                </span> */}
              </div>
              {/* <div className={style.loginBox} onClick={handleLogoutClick}>
                로그아웃
              </div> */}
            </div>
          ) : (
            <Link to={"/Login"} style={{ textDecoration: "none" }}>
              <div className={style.loginBox}>로그인</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
