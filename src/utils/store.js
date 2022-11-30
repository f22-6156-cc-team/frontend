import { atom } from "recoil";
export const modalAtom = atom({
  key: "modal",
  default: {
    isUploadModalOpen: false,
  },
});

export const defaultUserState = {
  hasLogined: false,
  uid: "",
  name: "",
  picture: "",
  exp: 0,
};

export const userAtom = atom({
  key: "user",
  default: defaultUserState,
});
