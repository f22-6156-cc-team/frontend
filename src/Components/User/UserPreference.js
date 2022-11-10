import React from 'react'
import { useState } from 'react';
import Sidebar from "../UserSidebar/Sidebar";
import { UserPreferenceData } from '../../Assets/UserPreferenceData';
import "./User.css"

function UserPreference() {
    // const [inputs, setInputs] = useState({});

    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs(values => ({...values, [name]: value}))
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     alert(inputs);
    // }

    return (
        <div>
            <Sidebar/> 
            <ul className='mainText'>
                <li> Sleeping Time: {UserPreferenceData[0].sleepingTime} </li>
                <li> Wakeup Time:   {UserPreferenceData[0].wakeupTime}   </li>
            </ul>

            {/* <form onSubmit={handleSubmit}>
                <label>Enter your sleeping time:
                <input 
                    type="text" 
                    name="sleeping" 
                    value={inputs.username || ""} 
                    onChange={handleChange}
                />
                </label>
                <label>Enter your wakeup time:
                    <input 
                    type="text" 
                    name="wakeup" 
                    value={inputs.age || ""} 
                    onChange={handleChange}
                    />
                </label>
                <input type="submit" />
            </form> */}
        </div>
        
    )
}

export default UserPreference