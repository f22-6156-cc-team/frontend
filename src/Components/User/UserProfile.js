import React from 'react'
import Sidebar from "../UserSidebar/Sidebar";
import "./User.css"

function UserProfile() {
  return (
    <div> 
      <Sidebar/> 
      <ul className='mainText'>
        <li> User Name </li>
        <li> User ID </li>
        <li> Description </li>
      </ul>
    </div>
  );
}

export default UserProfile;