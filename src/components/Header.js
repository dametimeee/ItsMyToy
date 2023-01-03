import { useState } from "react";
import style from "./Header.module.scss";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Search } from "../routes/Search";
import { Link } from "react-router-dom";

function Header() {
  const [search, setSearch] = useState("");

  const onSearchChange = (event) => {
    const {
      target: { value },
    } = event;
    setSearch(value);
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
                onChange={onSearchChange}
                value={search}
              />
              <Link
                to={{
                  pathname: "/search",
                  state: { search },
                }}
              >
                <button>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size={"1x"} />
                </button>
              </Link>
            </div>
          </div>
          <div className={style.login__box}>로그인</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
