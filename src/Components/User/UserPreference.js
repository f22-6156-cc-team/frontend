import React from 'react'
import Sidebar from "../UserSidebar/Sidebar";
import "./User.css"

function UserPreference() {
  return (
    <div> 
        <Sidebar/> 
        <ul className='mainText'>
            <li> Sleeping Time: </li>
            <li> Wakeup Time: </li>
        </ul>
    </div>
  )
}

export default UserPreference