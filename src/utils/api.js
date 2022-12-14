import Axios from "axios";
import { faker } from "@faker-js/faker";
import { JWT_NAME } from "./const";
import { CoPresentOutlined } from "@mui/icons-material";

const GOOGLE_PLACES_API = "https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyC_bgUWAymO0NfPmyDkz9H2V_M1VMmOtT0";
export const request = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// set every request headers with JWT Token
request.interceptors.request.use((req) => {
  // skip existed Authorization injection
  if (req.headers.Authorization) {
    return req;
  }

  const JWTToken = localStorage.getItem(JWT_NAME) || "";
  if (JWTToken) {
    req.headers = {
      Authorization: `Bearer ${JWTToken}`,
    };
  }
  console.log(`Bearer ${JWTToken}`)
  return req;
});

export const APIs = {
  /**
   * get user profile
   * @param {*} uid
   * @returns
   */
  async getUserProfile(uid) {
    try {
      const rsp = await request.get(`/user/${uid}`);
      return rsp.data;
    } catch (e) {
      console.error(e);
    }
  },
  async editUser(uid, data) {
    try {
      const rsp = await request.put(`/user/${uid}`, data);
      return rsp.data;
    } catch (e) {
      console.error(e);
    }
  },
  async getPreference(uid) {
    try {
      const rsp = await request.get(`/user/${uid}/personal_preference`);
      return rsp.data;
    } catch (e) {
      console.error(e);
    }
  },
  async editPreference(uid, data) {
    try {
      const rsp = await request.put(`/user/${uid}/personal_preference`, data);
      return rsp.data;
    } catch (e) {
      console.error(e);
    }
  },
  async createPreference(uid, data) {
    try {
      const rsp = await request.post(`/user/${uid}/personal_preference`, data);
      return rsp.data;
    } catch (e) {
      console.error(e);
    }
  },
  async getContact(uid) {
    try {
      console.log("in get contact, uid : " + uid);
      const rsp = await request.get(`/user/${uid}/contact`);
      return rsp.data;
    } catch (e) {
      console.error(e);
    }
  },
  async createContact(uid, data) {
    try {
      const rsp = await request.post(`/user/${uid}/contact`, data);
      return rsp.data;
    } catch (e) {
      console.error(e);
    }
  },
  async createEmail(uid, data) {
    try {
      const rsp = await request.post(`/user/${uid}/contact/email`, data);
      return rsp.data;
    } catch (e) {
      console.error(e);
    }
  },
  async createPhone(uid, data) {
    try {
      const rsp = await request.post(`/user/${uid}/contact/phone`, data);
      return rsp.data;
    } catch (e) {
      console.error(e);
    }
  },
  async getOneListing(lid) {
    try {
      const resp = await request.get(`/listing/${lid}`);
      return resp.data;
    } catch (e) {
      console.error(e);
    }

    return [];
  },
  async getListings() {
    try {
      const resp = await request.get("/listings");

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
      const resp = await request.post("/listings", data);

      return {
        ...resp.data,
        img: faker.image.imageUrl(250, 140, "city", true),
      };
    } catch (e) {
      console.error(e);
    }
    return null;
  },
  async updateListing(listingId, data) {
    try {
      console.log('in api', data);
      const resp = await request.put(`/listing/${listingId}`, data);
      console.log('in api resp', resp)
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
      const resp = await request.delete(`/listing/${listingId}`);

      return resp;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
  async signAccount(credential) {
    try {
      const resp = await request.post(
        `/account/sign`,
        new URLSearchParams({
          credential,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // console.log(resp)
      return resp;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
  async refreshAccount(refreshToken) {
    try {
      const resp = await request.post(`/account/refresh`, undefined, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      return resp;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
  async getValidatedAddress(addressLines) {
    if (addressLines) {
      try {
        const resp = await fetch(`${GOOGLE_PLACES_API}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'address': {
                'addressLines': addressLines
            }
          })  
        })
        // .then((resp) => resp.json())
        // .then((resp) => console.log('resp', resp))
        // .then((resp) => {return resp;})
        return resp.json();
      } catch (e) {
        console.error(e);
        return e;
      }
    }
    return null;
  }
};
