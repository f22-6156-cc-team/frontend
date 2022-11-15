import Sidebar from "../UserSidebar/Sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserContact(props) {
  const { uid } = useParams();

  const [userContactData, setUserContactData] = useState(null);
  useEffect(() => {
    async function fetchUserContactData() {
      try {
        const rsp = await axios.get(
          `https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test/user/${uid}/contact`
        );
        setUserContactData(rsp.data);
        // console.log(rsp.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserContactData();
  }, []);

  const item = (key, val) => (
    <div className="mt-1 font-normal text-lg flex ml-8">
      <p className="p-1 font-medium text-gray-900">{key} : </p>
      <p className="hover:text-gray-900 p-1"> {val}</p>
    </div>
  );

  const email = userContactData.emails[0].address;

  return (
    <div>
      <Sidebar />
      <div className="text-gray-500 flex-1 flex flex-col items-center">
        <div className="flex flex-col place-items-stretch">
          {item("Email", email)}
        </div>
      </div>
    </div>
  );
}

export default UserContact;
