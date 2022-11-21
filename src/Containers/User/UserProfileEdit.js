import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";


export default function UserProfileEdit() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.state.username);

  function handleSubmit(e) {
    e.preventDefault();
    const data = { username: value };
    fetch(`https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test/user/${uid}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => console.log(res));
    navigate(`/userprofile/${uid}`) ;
  }

  function handleValue(e) {
    setValue(e.target.value);
  }

  return (
    <section id="app">
      <form action="" onSubmit={handleSubmit}>
        <span> Username: </span>
        <input type="text" onChange={handleValue} placeholder={location.state.username}/>
        <button> Update </button>
      </form>
    </section>
  )
}
