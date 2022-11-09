import React from 'react'
import Sidebar from "../UserSidebar/Sidebar";

function UserContact() {

  return (
    <div> 
        <Sidebar/> 
        <ul className='mainText'>
            <li> Email: </li>
            <li> Phone: </li>
        </ul>
    </div>
  )
}

export default UserContact