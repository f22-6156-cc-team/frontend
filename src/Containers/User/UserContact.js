import Sidebar from "../UserSidebar/Sidebar";
import React, { useEffect, useState } from "react";
import Axios from "axios";import { useParams, Link, useNavigate} from "react-router-dom";
import { Card, CardContent, Modal, Select, MenuItem, Grid, Button} from "@mui/material";
import { login } from "../../utils/login";
import { useSetRecoilState } from 'recoil';
import { userAtom } from "../../utils/store";
import { JWT_NAME } from "../../utils/const";
import { APIs } from "../../utils/api";

function UserContact() {
  const { uid } = useParams();
  const [userContactData, setUserContactData] = useState(null);
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userAtom);
  const request = Axios.create();

  useEffect(() => {
    async function fetchUserContactData() {
      const data = await APIs.getContact(uid);
      console.log(data);
      setUserContactData(data);
    }
    fetchUserContactData();
  }, []);

  
  return (
    <div className="flex">
      <Sidebar />
      <Grid className="m-auto grid grid-cols-2 gap-4 p-4 pt-8">
        <Card
          variant="outlined"
          className="hover:shadow-2xl shadow-md"
        >
          <CardContent className="flex flex-col w-96">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-2xl">User Contact</h3>
            </div>
            <div className="flex text-start items-start">
              <div className="pt-2 space-y-2">
                <p>Email: {userContactData?.emails[0]?.address}</p>
                <p>Email Type: {userContactData?.emails[0]?.emailType}</p>
                <p>Phone: {userContactData?.phones[0]?.number}</p>
                <p>Phone Type: {userContactData?.phones[0]?.phoneType}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default UserContact;
