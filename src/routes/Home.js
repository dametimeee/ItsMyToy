import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Header from "../components/Header";
import Webtoon from "../components/Webtoon";
import Loading from "../components/Loading";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [webtoons, setWebtoons] = useState([]);
  const [company, setCompany] = useState("naver");
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun", "naverDaily"];
  const [monWebtoon, setMonWebtoon] = useState([]);
  const [tueWebtoon, setTueWebtoon] = useState([]);
  const [wedWebtoon, setWedWebtoon] = useState([]);
  const [thuWebtoon, setThuWebtoon] = useState([]);
  const [friWebtoon, setFriWebtoon] = useState([]);
  const [satWebtoon, setSatWebtoon] = useState([]);
  const [sunWebtoon, setSunWebtoon] = useState([]);
  const [dailyWebtoon, setDailyWebtoon] = useState([]);
  const getWebtoons = async () => {
    for (let updateDay of days) {
      const json = await (
        await fetch(
          `https://korea-webtoon-api.herokuapp.com/?perPage=200&service=${company}&updateDay=${updateDay}`
        )
      ).json();
      if (updateDay === "mon") {
        setMonWebtoon(json.webtoons);
        setWebtoons();
      } else if (updateDay === "tue") {
        setTueWebtoon(json.webtoons);
        setWebtoons();
      } else if (updateDay === "wed") {
        setWedWebtoon(json.webtoons);
        setWebtoons();
      } else if (updateDay === "thu") {
        setThuWebtoon(json.webtoons);
        setWebtoons();
      } else if (updateDay === "fri") {
        setFriWebtoon(json.webtoons);
        setWebtoons();
      } else if (updateDay === "sat") {
        setSatWebtoon(json.webtoons);
        setWebtoons();
      } else if (updateDay === "sun") {
        setSunWebtoon(json.webtoons);
        setWebtoons();
      } else if (updateDay === "naverDaily") {
        setDailyWebtoon(json.webtoons);
        setWebtoons();
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
