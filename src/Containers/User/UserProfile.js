import React, { useState } from "react";
import Sidebar from "../UserSidebar/Sidebar";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import "./User.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { uid } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect( ()=> {
    async function fetchUserData() {
      if (uid) {
        try {
          const rsp = await axios.get(`https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test/user/${uid}`);
          setUserProfile(rsp.data);
        } catch(err) {
          console.log(err)
        }
      }
    }
    fetchUserData();
  }, []);
  
  const item = (field, value) => ( 
    <div className="mt-1 font-normal text-lg flex ml-8">
    <span className="p-1 font-medium text-gray-900"> {field} </span>
    <span className="hover:text-gray-900 p-1"> {value} </span>
    </div>)
  
  const profile = ( userProfile &&
    <div>
      {/* <Avatar
            className="w-64 h-64 mt-32 mb-16"
            alt="Remy Sharp"
            src="avator.png"
      /> */}
      {item("Username: ", userProfile.username)}
      {item("User ID: ", userProfile.userId)}
      {item("First Name: ", userProfile.firstName)}
      {item("Last Name: ", userProfile.lastName)}
    </div>
  )

  const editButton = <Button onClick={toEdit} color="inherit"> Edit </Button>;
  //Sending required data for updating email and phone to edit page
  function toEdit(){ 
    navigate(`/userprofile/${uid}/edit`, {state:{ username: userProfile.username }}); 
  }

  return (
    <div className="flex">
      {userProfile && <Sidebar uid={userProfile?.userId}/>}
      <div className="text-gray-500 flex-1 flex flex-col items-center">
        <div className="flex flex-col place-items-stretch"> 
          {(window.profile == undefined) ? '' : (window.profile ? "Successfully Updated" : "Invalid Input")} 
          {profile}
          {editButton}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
