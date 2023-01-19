import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Header from "../../components/Header/Header";
import Webtoon from "../../components/Webtoon/Webtoon";
import Loading from "../../components/Loading/Loading";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [monWebtoon, setMonWebtoon] = useState([]);
  const [tueWebtoon, setTueWebtoon] = useState([]);
  const [wedWebtoon, setWedWebtoon] = useState([]);
  const [thuWebtoon, setThuWebtoon] = useState([]);
  const [friWebtoon, setFriWebtoon] = useState([]);
  const [satWebtoon, setSatWebtoon] = useState([]);
  const [sunWebtoon, setSunWebtoon] = useState([]);

  const getWebtoons = async () => {
    const json = await (
      await fetch(
        `https://korea-webtoon-api.herokuapp.com/?perPage=3000&service=naver`
      )
    ).json();

    for (let webtoon of json.webtoons) {
      if (webtoon.updateDays[0] === "mon") {
        monWebtoon.push(webtoon);
      } else if (webtoon.updateDays[0] === "tue") {
        tueWebtoon.push(webtoon);
      } else if (webtoon.updateDays[0] === "wed") {
        wedWebtoon.push(webtoon);
      } else if (webtoon.updateDays[0] === "thu") {
        thuWebtoon.push(webtoon);
      } else if (webtoon.updateDays[0] === "fri") {
        friWebtoon.push(webtoon);
      } else if (webtoon.updateDays[0] === "sat") {
        satWebtoon.push(webtoon);
      } else if (webtoon.updateDays[0] === "sun") {
        sunWebtoon.push(webtoon);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getWebtoons();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Header />
          <div className={styles.home__wrapper}>
            <div className={styles.contents}>
              <div className={`${styles.content} ${styles.content__mon}`}>
                <div className={styles.day}>월요웹툰</div>
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
                <div className={styles.day}>화요웹툰</div>
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
                <div className={styles.day}>수요웹툰</div>
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
                <div className={styles.day}>목요웹툰</div>
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
                <div className={styles.day}>금요웹툰</div>
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
                <div className={styles.day}>토요웹툰</div>
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
                <div className={styles.day}>일요웹툰</div>
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
      )}
    </div>
  );
}

export default Home;
