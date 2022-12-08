import { GOOGLE_JWT_NAME, JWT_NAME, JWT_REFRESH_NAME } from "./const";
import jwt_decode from "jwt-decode";
import { defaultUserState } from "./store";
import { APIs } from "./api";

export async function login(setUserState, retry = 3) {
  if (retry === 0) {
    throw Error("Failed to login.");
  }

  const jwt = localStorage.getItem(JWT_NAME);
  const googleJwt = localStorage.getItem(GOOGLE_JWT_NAME);

  if (!jwt || !googleJwt) {
    setUserState(defaultUserState);
    return;
  }

  const decoded = jwt_decode(jwt);
  const decodedGoogle = jwt_decode(googleJwt);

  if (decoded?.exp < Date.now() / 1000) {
    // expire
    const refreshToken = localStorage.getItem(JWT_REFRESH_NAME);

    if (refreshToken) {
      const resp = await APIs.refreshAccount(refreshToken);

      if (resp.status === 200) {
        localStorage.setItem(JWT_NAME, resp.data.access_token);
        return login(setUserState, retry - 1);
      }
    }

    setUserState(defaultUserState);
    return;
  }

  // valid
  setUserState({
    hasLogined: true,
    uid: decoded.sub,
    name: decodedGoogle.name,
    picture: decodedGoogle.picture,
    exp: decoded.exp,
  });
}
