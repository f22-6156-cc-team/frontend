import axios from "axios";

export const serverUrl =
  "https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test";

export async function getUser(id) {
  try {
    // const header = { "Content-Type": "application/x-www-form-urlencoded" };
    const resp = await axios.get(`${serverUrl}/user/${id}`); //, { headers: header });
    // return resp.data;
    console.log(resp);
    const firstname = resp.data.firstname;
    return firstname;
  } catch (e) {
    console.error(e);
    return id;
  }
}
