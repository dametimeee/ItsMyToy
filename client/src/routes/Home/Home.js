import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Header from "../../components/Header/Header";
import Webtoon from "../../components/Webtoon/Webtoon";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import {
  userState,
  loginState,
  isNaverState,
  webtoonState,
} from "../../recoil";
import { useRecoilState } from "recoil";
import Naver from "../../components/Webtoon/Naver";
import Kakao from "../../components/Webtoon/Kakao";

function Home() {
  const [isNaver, setIsNaver] = useRecoilState(isNaverState);
  const [isLoading, setIsLoading] = useState(true);
  const [kakaoWebtoons, setKakaoWebtoons] = useState([]);
  const [naverWebtoons, setNaverWebtoons] = useState([]);

  const getWebtoons = async () => {
    const json = await (
      await fetch(`https://korea-webtoon-api.herokuapp.com/?perPage=6000`)
    ).json();
    const webtoons = json.webtoons;
    for (let webtoon of webtoons) {
      if (webtoon.url.includes("kakao")) {
        kakaoWebtoons.push(webtoon);
      } else {
        naverWebtoons.push(webtoon);
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
      ) : isNaver ? (
        <Naver naverWebtoons={naverWebtoons} />
      ) : (
        <Kakao kakaoWebtoons={kakaoWebtoons} />
      )}
    </div>
  );
}
export default Home;
