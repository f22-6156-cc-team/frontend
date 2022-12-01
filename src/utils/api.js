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

export async function getValidatedAddress(addressLines) {
  if (addressLines) {
    return await fetch(process.env.REACT_APP_GOOGLE_ADDRESS_VERIFICATION, {
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
    .then((res) => res.json()) 
    .then((res) => {return res;} )
  }
  return null;
};