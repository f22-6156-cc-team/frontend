import { atom } from "recoil";
export const modalAtom = atom({
  key: "modal",
  default: {
    isUploadModalOpen: false,
  },
});
