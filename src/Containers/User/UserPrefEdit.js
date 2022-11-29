import { Container } from "postcss";
import React, { useState, optionsState } from "react";
import { useParams, useNavigate, Form } from "react-router-dom";
import NoticeBanner from "../NoticeBanner";
import { Button } from "@mui/material";

export default function UserPrefEdit() {
    const [select1, setSelect1] = useState("before 10PM");
    const [select2, setSelect2] = useState("before 7AM");
    const { uid } = useParams();
    const navigate = useNavigate();
    window.preference = true;
  
    function handleSubmit(e) {
        e.preventDefault();
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
        .then(res => {console.log(res);})
        .catch(error => {
            window.preference = false;
        });
        navigate(`/userpreference/${uid}`);
    }

    function handleSelect1(e) {
        setSelect1(e.target.value);
    }

    function handleSelect2(e) {
        setSelect2(e.target.value);
    }

    return (
        <div>
            <section>
            <form action="" onSubmit={handleSubmit}>
            <div>
            <span> Sleeping Time: </span>
            <select value={select1} onChange={handleSelect1}>
                <option value="before 10PM">before 10PM</option>
                <option value="10PM to 12PM">10PM to 12PM</option>
                <option value="after 12PM">after 12PM</option>
            </select>
            </div>

            <div>
            <span> Wakeup Time: </span>
            <select value={select2} onChange={handleSelect2}>
                <option value="before 7AM">before 7AM</option>
                <option value="7AM to 9AM">7AM to 9AM</option>
                <option value="after 9AM">after 9AM</option>
            </select>
            </div>
            <button> Update </button>
            </form>
            </section>
        </div>
    )
}
