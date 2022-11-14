import React, { useState } from "react";
import Sidebar from "../UserSidebar/Sidebar";
import Avatar from "@mui/material/Avatar";
import "./User.css";
import { useEffect } from "react";
import axios from "axios";

const UserProfile = (props) => {
  const [userProfile, setUserProfile] = useState(null);
  
  useEffect( ()=> {
    async function fetchUserData(uid) {
      if (uid) {
        try {
          const rsp = await axios.get(`https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test/user/${uid}`);
          setUserProfile(rsp.data);
        } catch(err) {
          console.log(err)
        }
      }
    }
    fetchUserData(props.uid);
  }, [userProfile]);
  
  // TODO: better create another component for this? im just lazy af.
  const item = (field, value) => ( 
    <div className="mt-1 font-normal text-lg flex ml-8">
    <p className="p-1 font-medium text-gray-900"> {field} </p>
    <p className="hover:text-gray-900 p-1"> {value}</p>
    </div>)
  
  const profile = ( userProfile &&
    <div>
      <Avatar
            className="w-64 h-64 mt-32 mb-16"
            alt="Remy Sharp"
            src="avator.png"
      />
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
          {profile}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
