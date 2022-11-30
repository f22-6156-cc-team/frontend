import { JWT_NAME } from "./const";
import jwt_decode from "jwt-decode";
import { defaultUserState } from "./store";

export function login(setUserState) {
  const jwt = localStorage.getItem(JWT_NAME);

  if (!jwt) {
    return;
  }

  const decoded = jwt_decode(jwt);

  if (decoded?.exp < Date.now() / 1000) {
    // expire
    setUserState(defaultUserState);
    return;
  }

  // valid
  setUserState({
    hasLogined: true,
    uid: decoded.sub,
    name: decoded.name,
    picture: decoded.picture,
    exp: decoded.exp,
  });
}
