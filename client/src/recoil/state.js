import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "userState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const loginState = atom({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isNaverState = atom({
  key: "companyState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const naverLoginState = atom({
  key: "naverLoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const kakaoLoginState = atom({
  key: "kakaoLoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// export const webtoonState = atom({
//   key: "webtoonState",
//   default: fetch(`https://korea-webtoon-api.herokuapp.com/?perPage=3000`),
// });
