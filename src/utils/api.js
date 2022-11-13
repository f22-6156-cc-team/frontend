import axios from "axios";

export const serverUrl =
  "https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/v1/";

export async function getUsers(id) {
  try {
    const resp = await axios.get(`${serverUrl}/user/${id}`);
    return resp.data;
  } catch (e) {
    console.error(e);
    return id;
  }
}
