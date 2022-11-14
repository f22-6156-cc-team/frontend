import React, { useState } from "react";
import Sidebar from "../UserSidebar/Sidebar";
import { UserData } from "../../Assets/UserData";
import Avatar from "@mui/material/Avatar";
import "./User.css";
import { getUser } from "../../utils/api";
import { useEffect } from "react";
import axios from "axios";

function UserProfile(props) {
  const [userProfile, setUserProfile] = useState(null);
  useEffect( ()=> {
    // it's probably better to use effect to invoke data fetching at the component layer
    // source: react official doc && my exp
    // TODO 
    // 1. refactor userprofile to take in ID as part of props
    // 2. extract the api url to env variable
    // 3. the layout looks really bad rn :/
    async function fetchData() {
      try {
        const rsp = await axios.get("https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test/user/1");
        console.log(rsp.data)
        setUserProfile(rsp.data);
      } catch(err) {
        console.log(err)
      }
    }
    fetchData();
  }, userProfile);
  
  // TODO: better create another component for this? im just lazy af.
  const item = (field, value) => ( 
    <div className="mt-1 font-normal text-lg flex ml-8">
    <p className="p-1 font-medium text-gray-900"> {field} </p>
    <p className="hover:text-gray-900 p-1"> {value}</p>
    </div>)
  
  const profile = ( userProfile &&
    <div>
      {item("Username", userProfile.username)}
      {item("User ID", userProfile.userId)}
      {item("First Name", userProfile.firstName)}
      {item("Last Name", userProfile.lastName)}
  </div>
  )
  return (
    <div className="flex">
      <Sidebar />
      <div className="text-gray-500 flex-1 flex flex-col items-center">
        <div className="flex flex-col place-items-stretch">
          <Avatar
            className="w-64 h-64 mt-32 mb-16"
            alt="Remy Sharp"
            src="avator.png"
          />
          {profile}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
