import Axios from "axios";
import { faker } from "@faker-js/faker";
import { JWT_NAME } from "./const";

export const request = Axios.create();

// set every request headers with JWT Token
request.interceptors.request.use((req) => {
  const JWTToken = localStorage.getItem(JWT_NAME) || "";
  if (JWTToken) {
    req.headers = {
      Authorization: `Bearer ${JWTToken}`,
    };
  }
  return req;
});

/**
 * API Endpoints
 */
const Endpoints =
  process.env.NODE_ENV === "production"
    ? {
        USER_SERVICE_ENDPOINT:
          "https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test",
        LISTING_SERVICE_ENDPOINT:
          "https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test",
      }
    : {
        USER_SERVICE_ENDPOINT:
          "https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test",
        LISTING_SERVICE_ENDPOINT: `${process.env.REACT_APP_BASE_URL}/api`,
      };

export const APIs = {
  /**
   * get user profile
   * @param {*} uid
   * @returns
   */
  async getUserProfile(uid) {
    if (uid) {
      try {
        const rsp = await request.get(
          `${Endpoints.USER_SERVICE_ENDPOINT}/user/${uid}`
        );
        return rsp.data;
        // console.log(resp);
        // const firstname = resp.data.firstname;
        // return firstname;
      } catch (e) {
        console.error(e);
      }
      return null;
    }
  },
  async getListings() {
    try {
      const resp = await request.get(
        `${Endpoints.LISTING_SERVICE_ENDPOINT}/listings`
      );

      return resp.data.map((v) => ({
        ...v,
        img: faker.image.imageUrl(250, 140, "city", true),
      }));
    } catch (e) {
      console.error(e);
    }

    return [];
  },
  async createListing(data) {
    try {
      const resp = await request.post(
        `${Endpoints.LISTING_SERVICE_ENDPOINT}/listings`,
        data
      );

      return {
        ...resp.data,
        img: faker.image.imageUrl(250, 140, "city", true),
      };
    } catch (e) {
      console.error(e);
    }
    return null;
  },
  async deleteListing(listingId) {
    try {
      const resp = await request.delete(
        `${Endpoints.LISTING_SERVICE_ENDPOINT}/listing/${listingId}`
      );

      return resp;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
