import React, { useState, optionsState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserPrefEdit() {
    const [select1, setSelect1] = useState("before 10PM");
    const [select2, setSelect2] = useState("before 7AM");
    const { uid } = useParams();
    const navigate = useNavigate();
  
    function handleSubmit(e) {
        e.preventDefault();
        console.log("selected value:",select1)
        const data = { sleepingTime: select1,
                       wakeupTime: select2};
        
        fetch(`https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test/user/${uid}/personal_preference`, {
            method: 'PUT',
            headers: {
            'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => console.log(res));
      
        navigate(`/userpreference/${uid}`);
    }

    function handleSelect1(e) {
        setSelect1(e.target.value);
    }

    function handleSelect2(e) {
        setSelect2(e.target.value);
    }

    return (
      <section id="app">
        <form action="" onSubmit={handleSubmit}>
        <div>
        <span> Sleeping Time: </span>
        <select value={optionsState} onChange={handleSelect1}>
            <option value="before 10PM">before 10PM</option>
            <option value="10PM to 12PM">10PM to 12PM</option>
            <option value="after 12PM">after 12PM</option>
        </select>
        </div>

        <div>
        <span> Wakeup Time: </span>
        <select value={optionsState} onChange={handleSelect2}>
            <option value="before 7AM">before 7AM</option>
            <option value="7AM to 9AM">7AM to 9AM</option>
            <option value="after 9AM">after 9AM</option>
        </select>
        </div>
        <button> Update </button>
        </form>
      </section>
    )
}
