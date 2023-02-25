import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Loading from "../../components/Loading/Loading";
import axios from "axios";
import {
  userState,
  loginState,
  isNaverState,
  naverLoginState,
} from "../../recoil";
import { useRecoilState } from "recoil";
import Naver from "../../components/Webtoon/Naver";
import Kakao from "../../components/Webtoon/Kakao";

function Home() {
  const [isNaver, setIsNaver] = useRecoilState(isNaverState);
  const [isLoading, setIsLoading] = useState(true);
  const [kakaoWebtoons, setKakaoWebtoons] = useState([]);
  const [naverWebtoons, setNaverWebtoons] = useState([]);
  const [isWtData, setIsWtData] = useState(false);
  const [status, setStatus] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [naverLogin, setNaverLogin] = useRecoilState(naverLoginState);

  const history = useHistory();

  function handleUseHistory() {
    history.push("/");
  }

  const getWebtoons = async () => {
    if (!isWtData) {
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
      setIsWtData(true);
    }
    setIsLoading(false);
  };

  const isNaverLoginCheck = async (req, res) => {
    axios
      .get("/api/users/naver/data", { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
          setIsLogin(true);
          handleUseHistory();
        } else {
          return;
        }
      });
  };

  const isKakaoLoginCheck = async (req, res) => {
    axios
      .get("/api/users/kakao/data", { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
          setIsLogin(true);
          handleUseHistory();
        } else {
          return;
        }
      });
  };

  useEffect(() => {
    getWebtoons();
    isNaverLoginCheck();
    isKakaoLoginCheck();
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
