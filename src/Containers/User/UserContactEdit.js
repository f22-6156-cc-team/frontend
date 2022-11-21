import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";


export default function UserContactEdit() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state.email);
  const [phone, setPhone] = useState(location.state.phone);

  function handleSubmit(e) {
    e.preventDefault();
    const emailData = { address : email,
                        emailType : location.state.emailType}
    const phoneData = { number : phone,
                        phoneType : location.state.phoneType}
    fetch(`https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test/user/${uid}/contact/email/${location.state.emailId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })
      .then(res => res.json())
      .then(res => console.log(res));

    fetch(`https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test/user/${uid}/contact/phone/${location.state.phoneId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(phoneData),
    })
      .then(res => res.json())
      .then(res => console.log(res));
    navigate(`/usercontact/${uid}`) ;
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePhone(e) {
    setPhone(e.target.value);
  }

  return (
    <section id="app">
      <form action="" onSubmit={handleSubmit}>
        <div>
          <span> Email: </span>
          <input type="text" onChange={handleEmail} placeholder={location.state.email}/>
        </div>
        <div>
          <span> Phone: </span>
          <input type="text" onChange={handlePhone} placeholder={location.state.phone}/>
        </div>
        <button> Update </button>
      </form>
    </section>
  )
}
