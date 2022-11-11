import React from "react";
import Sidebar from "../UserSidebar/Sidebar";
import { UserContactData } from "../../Assets/UserContactData";

function UserContact() {
  return (
    <div>
      <Sidebar />
      <div className="text-gray-500 flex-1 flex flex-col items-center">
        <div className="flex flex-col place-items-stretch">
          <div className="mt-1 font-normal text-lg flex ml-8">
            <p className="p-1 font-medium text-gray-900">Email: </p>
            <p className="hover:text-gray-900 p-1">
              {" "}
              {UserContactData[0].emails[0]}
            </p>
          </div>
          <div className="mt-1 font-normal text-lg flex ml-8">
            <p className="p-1 font-medium text-gray-900">Phone: </p>
            <p className="hover:text-gray-900 p-1">
              {" "}
              {UserContactData[0].phones[0]}
            </p>
          </div>
          <div className="mt-1 font-normal text-lg flex ml-8">
            <p className="p-1 font-medium text-gray-900">Address: </p>
            <p className="hover:text-gray-900 p-1">
              {" "}
              {UserContactData[0].addresses[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserContact;
