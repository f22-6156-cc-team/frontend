import React from "react";
import Sidebar from "../UserSidebar/Sidebar";
import { UserContactData } from "../../Assets/UserContactData";

function UserContact() {
  return (
    <div>
      <Sidebar />
      <ul className="mainText">
        <li> Email: {UserContactData[0].emails[0]} </li>
        <li> Phone: {UserContactData[0].phones[0]} </li>
        <li> Address: {UserContactData[0].addresses[0]} </li>
      </ul>
    </div>
  );
}

export default UserContact;
