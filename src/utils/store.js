import { selector } from "recoil";
import { atom } from "recoil";

export const LISTING_MODAL_ACTIONS = {
  UPLOAD: "UPLOAD",
  EDIT: "EDIT",
};

export const modalAtom = atom({
  key: "modal",
  default: {
    isListingModalOpen: false,
    listingModalAction: LISTING_MODAL_ACTIONS.UPLOAD,
  },
});

/**
 * listing in processing(edit or read)
 */
export const listingAtom = atom({
  key: "listing",
  default: null,
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

export const userExpSelector = selector({
  key: "userExpSelector",
  get: ({ get }) => {
    const user = get(userAtom);

    return user.exp;
  },
});

export const listingsAtom = atom({
  key: "listings",
  default: {
    list: [],
  },
});

export const snackBarAtom = atom({
  key: "snackBar",
  default: {
    isOpen: false,
    message: "",
    severity: "success",
  },
});
