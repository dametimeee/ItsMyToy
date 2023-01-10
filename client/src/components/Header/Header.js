import { useState, useRef } from "react";
import style from "./Header.module.scss";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Header() {
  const [search, setSearch] = useState("");
  const searchBtn = useRef();

  const handleSearchChange = (event) => {
    const {
      target: { value },
    } = event;
    setSearch(value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key == "Enter") {
      searchBtn.current.click();
    }
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
            />
          </div>
          <div>ThisIsTitle</div>
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
          <Link to={"/Join"} style={{ textDecoration: "none" }}>
            <div className={style.login__box}>로그인</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
