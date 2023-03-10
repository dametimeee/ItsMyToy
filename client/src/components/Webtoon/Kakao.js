import { useEffect, useState } from "react";
import styles from "./Kakao.module.scss";
import Webtoon from "./Webtoon";
import Loading from "../Loading/Loading";
import Header from "../Header/Header";

function Kakao({ kakaoWebtoons }) {
  const [monWebtoon, setMonWebtoon] = useState([]);
  const [tueWebtoon, setTueWebtoon] = useState([]);
  const [wedWebtoon, setWedWebtoon] = useState([]);
  const [thuWebtoon, setThuWebtoon] = useState([]);
  const [friWebtoon, setFriWebtoon] = useState([]);
  const [satWebtoon, setSatWebtoon] = useState([]);
  const [sunWebtoon, setSunWebtoon] = useState([]);
  const [finishedWebtoon, setFinishedWebtoon] = useState([]);

  for (let kakaoWebtoon of kakaoWebtoons) {
    if (kakaoWebtoon.updateDays[0] === "mon") {
      monWebtoon.push(kakaoWebtoon);
    } else if (kakaoWebtoon.updateDays[0] === "tue") {
      tueWebtoon.push(kakaoWebtoon);
    } else if (kakaoWebtoon.updateDays[0] === "wed") {
      wedWebtoon.push(kakaoWebtoon);
    } else if (kakaoWebtoon.updateDays[0] === "thu") {
      thuWebtoon.push(kakaoWebtoon);
    } else if (kakaoWebtoon.updateDays[0] === "fri") {
      friWebtoon.push(kakaoWebtoon);
    } else if (kakaoWebtoon.updateDays[0] === "sat") {
      satWebtoon.push(kakaoWebtoon);
    } else if (kakaoWebtoon.updateDays[0] === "sun") {
      sunWebtoon.push(kakaoWebtoon);
    } else {
      finishedWebtoon.push(kakaoWebtoon);
    }
  }

  return (
    <div>
      <div>
        <Header />
        <div className={styles.home__wrapper}>
          <div className={styles.contents}>
            <div className={`${styles.content} ${styles.content__mon}`}>
              <div className={styles.day}>μμμΉν°</div>
              {monWebtoon.map((webtoon) => (
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
            <div className={styles.content}>
              <div className={styles.day}>νμμΉν°</div>
              {tueWebtoon.map((webtoon) => (
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
            <div className={styles.content}>
              <div className={styles.day}>μμμΉν°</div>
              {wedWebtoon.map((webtoon) => (
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
            <div className={styles.content}>
              <div className={styles.day}>λͺ©μμΉν°</div>
              {thuWebtoon.map((webtoon) => (
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
            <div className={styles.content}>
              <div className={styles.day}>κΈμμΉν°</div>
              {friWebtoon.map((webtoon) => (
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
            <div className={styles.content}>
              <div className={styles.day}>ν μμΉν°</div>
              {satWebtoon.map((webtoon) => (
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
            <div className={`${styles.content} ${styles.content__sun}`}>
              <div className={styles.day}>μΌμμΉν°</div>
              {sunWebtoon.map((webtoon) => (
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
            {/* <div>
            {dailyWebtoon.map((webtoon) => (
              <Webtoon
                    key={webtoon._id}
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
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kakao;
