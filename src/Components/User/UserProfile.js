import React from "react";
import Sidebar from "../UserSidebar/Sidebar";
import { UserData } from "../../Assets/UserData";
import Avatar from "@mui/material/Avatar";
import "./User.css";
import { getUser } from "../../utils/api";

function UserProfile() {
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
          <div className="mt-1 font-normal text-lg flex ml-8">
            <p className="p-1 font-medium text-gray-900">User Name: </p>
            <p className="hover:text-gray-900 p-1"> {getUser(1)}</p>
          </div>
          <div className="mt-1 font-normal text-lg flex ml-8">
            <p className="p-1 font-medium text-gray-900">User ID: </p>
            <p className="hover:text-gray-900 p-1"> {UserData[0].userId}</p>
          </div>
          <div className="mt-1 font-normal text-lg flex ml-8">
            <p className="p-1 font-medium text-gray-900">First Name: </p>
            <p className="hover:text-gray-900 p-1"> Admin</p>
          </div>
          <div className="mt-1 font-normal text-lg flex ml-8">
            <p className="p-1 font-medium text-gray-900">Last Name: </p>
            <p className="hover:text-gray-900 p-1"> Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
