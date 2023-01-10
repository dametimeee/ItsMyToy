import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.scss";
import Header from "../../components/Header/Header";

function Detail() {
  const [webtoon, setWebtoon] = useState([]);
  const { title } = useParams();
  const getWebtoon = async () => {
    const json = await (
      await fetch(
        `https://korea-webtoon-api.herokuapp.com/search?keyword=${title})}`
      )
    ).json();
    setWebtoon(json.webtoons[0]);
  };

  useEffect(() => {
    getWebtoon();
  }, []);
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div>
          <img className={styles.image} src={webtoon.img}></img>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{webtoon.title}</div>
          <div className={styles.author}>{webtoon.author}</div>
          <div className={styles.service}>{webtoon.service}</div>
          <div className={styles.updateDays}>{webtoon.updateDays}</div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
