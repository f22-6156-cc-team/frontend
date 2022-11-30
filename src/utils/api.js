import axios from "axios";
import { useState, useEffect } from "react";

const USER_SERVICE_ENDPOINT =
  "https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test";

const GOOGLE_PLACES_API = "https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyC_bgUWAymO0NfPmyDkz9H2V_M1VMmOtT0";

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
    fetch(`${GOOGLE_PLACES_API}`, {
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
  }
  return null;
};

export async function exportData(addressLines) {
  const res = await getValidatedAddress(addressLines);
  return res;
}