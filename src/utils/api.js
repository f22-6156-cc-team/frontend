import Axios from "axios";
export const request = Axios.create();

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
  /**
   *
   * @param {*} body - page, size
   */
  async getListings() {
    try {
      const resp = await request.get(
        `${Endpoints.LISTING_SERVICE_ENDPOINT}/listings`
      );
      console.log('resp', resp);

      return resp.data;
    } catch (e) {
      console.error(e);
    }

    return [];
  },
};
