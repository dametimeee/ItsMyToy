import { useState, useRef } from "react";
import style from "./Header.module.scss";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import { userState, loginState, isNaverState } from "../../recoil";
import { useRecoilState } from "recoil";
import axios from "axios";
import Profile from "../Profile/Profile";
import Sidebar from "../Sidebar/Sidebar";

function Header() {
  const [search, setSearch] = useState("");
  const searchBtn = useRef();
  const [user, setUser] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [isNaver, setIsNaver] = useRecoilState(isNaverState);
  const [profile, setProfile] = useState(false);
  const [sidebar, setSidebar] = useState(false);

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

  const handleNaverLogoClick = () => {
    setIsNaver(true);
  };

  const handleKakaoLogiClick = () => {
    setIsNaver(false);
  };

  const handleProfileClick = () => {
    setProfile((prev) => !prev);
  };

  const handleSearchClick = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <div>
      <div className={style.header__wrapper}>
        <div className={style.header__left}>
          <div>
            <FontAwesomeIcon
              icon={faBars}
              size={"xl"}
              className={style.header__icon__bar}
              onClick={handleSearchClick}
            />
          </div>
          {sidebar ? <Sidebar /> : <></>}
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className={style.header__title}>ThisIsTitle</div>
          </Link>
        </div>
        <div className={style.header__right}>
          <img
            className={`${style.logo} ${style.kakao__logo}`}
            src="https://i1.wp.com/wowtale.net/wp-content/uploads/2022/02/wowtale.net---1-1.jpg?zoom=2&fit=300%2C300&ssl=1"
            onClick={handleNaverLogoClick}
          ></img>
          <img
            className={`${style.logo} ${style.naver__logo}`}
            src="https://play-lh.googleusercontent.com/41iW640PxKoS880AfgX55EQrzI7jO-SEkUt8tK-KUJrSn2f1784QoJZ8WSRpGmMsGcU"
            onClick={handleKakaoLogiClick}
          ></img>
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
                <div
                  className={style.loginBox__image}
                  onClick={handleProfileClick}
                >
                  😄
                </div>
                {profile ? <Profile /> : <div></div>}

                {/* <span className={style.loginBox__username}>
                  {user.username}
                </span> */}
              </div>
              {/* <div className={style.loginBox} onClick={handleLogoutClick}>
                로그아웃
              </div>  */}
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
