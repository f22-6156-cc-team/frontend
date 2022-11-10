import React from "react";
import Sidebar from "../UserSidebar/Sidebar";
import { UserData } from "../../Assets/UserData";
import "./User.css";

function UserProfile() {
  return (
    <div>
      <Sidebar />
      <ul className="mainText">
        <li> User Name: {UserData[0].username} </li>
        <li> User ID: {UserData[0].userId} </li>
      </ul>
    </div>
  );
}

export default UserProfile;
