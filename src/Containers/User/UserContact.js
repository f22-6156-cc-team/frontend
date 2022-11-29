import Sidebar from "../UserSidebar/Sidebar";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useParams, Link, useNavigate} from "react-router-dom";

function UserContact() {
  const { uid } = useParams();
  const [userContactData, setUserContactData] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchUserContactData() {
      try {
        const rsp = await axios.get(
          `https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test/user/${uid}/contact`
        );
        setUserContactData(rsp.data);
        // console.log(rsp.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserContactData();
  }, []);

  const item = (key, val) => (
    <div className="mt-1 font-normal text-lg flex ml-8">
      <span className="p-1 font-medium text-gray-900">{key} : </span>
      <span className="hover:text-gray-900 p-1"> {val}</span>
    </div>
  );

  const email = userContactData?.emails[0]?.address;
  const phone = userContactData?.phones[0]?.number;
  const editButton = <Button onClick={toEdit} color="inherit"> Edit </Button>;
  //Sending required data for updating email and phone to edit page
  function toEdit(){ 
    navigate(`/usercontact/${uid}/edit`, {state:{
    email: email,
    emailId: userContactData?.emails[0]?.emailId, 
    emailType: userContactData?.emails[0]?.emailType, 
    phone: phone,
    phoneId: userContactData?.phones[0]?.phoneId,
    phoneType: userContactData?.phones[0]?.phoneType
    }}); }
  
  return (
    <div>
      <Sidebar />
      <div className="text-gray-500 flex-1 flex flex-col items-center">
        <div className="flex flex-col place-items-stretch">
          {(window.contact == undefined) ? '' : (window.contact ? "Successfully Updated" : "Invalid Input")} 
          {item("Email", email)}
          {item("Phone", phone)}
        </div>
        {editButton}
      </div>
    </div>
  );
}

export default UserContact;
