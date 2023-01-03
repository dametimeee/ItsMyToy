import { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import Header from "../components/Header";
import Webtoon from "../components/Webtoon";

const Search = (props) => {
  const [searchWebtoon, setSearchWebtoon] = useState([]);
  const search = props.location.state.search;

  const getSearch = async () => {
    const json = await (
      await fetch(
        `https://korea-webtoon-api.herokuapp.com/search?keyword=${search})}`
      )
    ).json();
    console.log(json.webtoons);
    setSearchWebtoon(json.webtoons);
  };

  useEffect(() => {
    getSearch();
  }, [searchWebtoon]);
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={`${styles.content}`}>
          {searchWebtoon.map((webtoon) => (
            <Webtoon
              key={webtoon.webtoonId}
              _id={webtoon._id}
              title={webtoon.title}
              author={webtoon.author}
              url={webtoon.url}
              img={webtoon.img}
              service={webtoon.service}
              updateDays={webtoon.updateDays}
              searchKeyword={webtoon.searchKeyword}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
