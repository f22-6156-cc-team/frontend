import Sidebar from "../UserSidebar/Sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./User.css";

function UserPreference(props) {
  const { uid } = useParams();

  const [userPreferenceData, setUserPreferenceData] = useState(null);
  useEffect(() => {
    async function fetchUserPreferenceData() {
      try {
        const rsp = await axios.get(
          `https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test/user/${uid}/personal_preference`
        );
        setUserPreferenceData(rsp.data);
        // console.log(rsp.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserPreferenceData();
  }, []);

  const item = (key, val) => (
    <div className="mt-1 font-normal text-lg flex ml-8">
      <span className="p-1 font-medium text-gray-900">{key} : </span>
      <span className="hover:text-gray-900 p-1"> {val}</span>
    </div>
  );

  const sleepingTime = userPreferenceData?.sleepingTime;
  const wakeupTime = userPreferenceData?.wakeupTime;

  return (
    <div>
      <Sidebar />
      <div className="text-gray-500 flex-1 flex flex-col items-center">
        <div className="flex flex-col place-items-stretch">
          {item("Sleeping Time: ", sleepingTime)}
          {item("Wakeup Time: ", wakeupTime)}
        </div>
      </div>
    </div>
  );
}

export default UserPreference;
