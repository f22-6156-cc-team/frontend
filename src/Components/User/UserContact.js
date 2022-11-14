import Sidebar from "../UserSidebar/Sidebar";
import { UserContactData } from "../../Assets/UserContactData";
import React, { useEffect, useState }  from 'react'
import axios from "axios";

function UserContact(props) {

  const uid = props;
  const [userContactData, setUserContactData] = useState(null);
  useEffect( ()=> {
    async function fetchUserContactData() {
      try {
        const rsp = await axios.get(`https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test/user/${uid}/contact`);
        setUserContactData(rsp.data);
        console.log(rsp.data);
      } catch(err) {
        console.log(err)
      }
    }
    fetchUserContactData();
  }, []);

  const item = (key, val) => (
    <div className="mt-1 font-normal text-lg flex ml-8">
            <p className="p-1 font-medium text-gray-900">{key} : </p>
            <p className="hover:text-gray-900 p-1">
              {" "}
              {val}
            </p>
    </div>
  );

  return (
    <div>
      <Sidebar />
      <div className="text-gray-500 flex-1 flex flex-col items-center">
        <div className="flex flex-col place-items-stretch">
          {item("Email", userContactData?.emails[0])}
          {/* <div className="mt-1 font-normal text-lg flex ml-8">
            <p className="p-1 font-medium text-gray-900">Email: </p>
            <p className="hover:text-gray-900 p-1">
              {" "}
              {userContactData.}
            </p>
          </div>
          <div className="mt-1 font-normal text-lg flex ml-8">
            <p className="p-1 font-medium text-gray-900">Phone: </p>
            <p className="hover:text-gray-900 p-1">
              {" "}
              {UserContactData[0].phones[0]}
            </p>
          </div>
          <div className="mt-1 font-normal text-lg flex ml-8">
            <p className="p-1 font-medium text-gray-900">Address: </p>
            <p className="hover:text-gray-900 p-1">
              {" "}
              {UserContactData[0].addresses[0]}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default UserContact;
