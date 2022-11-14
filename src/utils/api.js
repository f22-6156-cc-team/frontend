import axios from "axios";

const USER_SERVICE_ENDPOINT =
  "https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test";

export async function getUserProfile(uid) {
  if (uid) {
  try {
    const rsp = await axios.get(`${USER_SERVICE_ENDPOINT}/user/${uid}`);
    return rsp.data;
    // console.log(resp);
    // const firstname = resp.data.firstname;
    // return firstname;
  } catch (e) {
    console.error(e);
  }
  return null;
  }
}