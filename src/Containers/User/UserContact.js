import Sidebar from "../UserSidebar/Sidebar";
import React, { useEffect, useState } from "react";
import Axios from "axios";import { useParams, Link, useNavigate} from "react-router-dom";
import { Card, CardContent, Modal, Select, MenuItem, Grid, Button, TextField, FormControl, InputLabel} from "@mui/material";
import { login } from "../../utils/login";
import { useSetRecoilState, useRecoilValue, useRecoilState} from 'recoil';
import { userAtom, modalAtom} from "../../utils/store";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { JWT_NAME } from "../../utils/const";
import { APIs } from "../../utils/api";

function UserContact() {
  const { uid } = useParams();
  const [userContactData, setUserContactData] = useState(null);
  const modalState = useRecoilValue(modalAtom);
  const setModalState = useSetRecoilState(modalAtom);
  const navigate = useNavigate();
  const [userState, setUserState] = useRecoilState(userAtom);
  const [email, setEmail] = useState("Personal");
  const onEmail = (e) => setEmail(e.target.value);
  const [phone, setPhone] = useState("Home");
  const onPhone = (e) => setPhone(e.target.value);

  function EditForm() {
    return (
      <>
        <TextField autoFocus margin="dense" id={"email"} label={"Email"} type="text" fullWidth variant="standard" defaultValue={userContactData?.emails[0]?.address}/>
        <FormControl>
        <InputLabel id="test-select-label">Email Type</InputLabel>
        <Select labelId="test-select-label" label="Email Type" onChange={onEmail} defaultValue="Personal" value={email}>
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="School">School</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
        </Select>
        </FormControl>
        <TextField autoFocus margin="dense" id={"phone"} label={"Phone"} type="text" fullWidth variant="standard" defaultValue={userContactData?.phones[0]?.number}/>
        <FormControl>
        <InputLabel id="test-select-label">Phone Type</InputLabel>
        <Select labelId="test-select-label" label="Phone Type" onChange={onPhone} defaultValue="Home" value={phone}>
          <MenuItem value="Home">Home</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Mobile">Mobile</MenuItem>
        </Select>
        </FormControl>
      </>
    );
  }

  function EditModal() {
    return (
      <Modal open={modalState.isUploadModalOpen}>
        <div className="bg-white w-1/3 h-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg px-14 py-8 overflow-scroll">
          <h3 className="text-2xl">Edit Your Contact</h3>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                
                const emailData = {
                address: "1",
                email_id: userContactData?.emails[0]?.emailId,
                emailType: email,
                userId: uid,
                is_active: "1",
                };
                const phoneData = {
                  number: "1",
                  phone_id: userContactData?.phones[0]?.phoneId,
                  phoneType: phone,
                  userId: uid,
                  is_active: "1",
                  };
                Array.from(e.target).forEach((item) => {
                  if (item.id == "email"){
                    emailData["address"] = item.value
                  }
                  if (item.id == "phone"){
                    phoneData["number"] = item.value
                  }
                });
                const resp1 = await APIs.deleteEmail(uid, userContactData?.emails[0]?.emailId);
                const resp2 = await APIs.deletePhone(uid, userContactData?.phones[0]?.phoneId);
                console.log(resp1);

                const resp3 = await APIs.createEmail(uid, emailData);
                const resp4 = await APIs.createPhone(uid, phoneData);
                console.log(resp3)
                
                setModalState({
                  isUploadModalOpen: false,
                });
                window.location.reload();
              }}
            >
              <div className="grid grid-cols-2 gap-12">
                <EditForm />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <Button
                  variant="outlined"
                  onClick={() => {
                    setModalState({
                      isUploadModalOpen: false,
                    });
                  }}
                >
                  CANCEL
                </Button>
                <Button type="submit" variant="contained">
                  SUBMIT
                </Button>
              </div>
            </form>
          </LocalizationProvider>
        </div>
      </Modal>
    );
  }

  useEffect(() => {
    async function fetchUserContactData() {
      const data = await APIs.getContact(uid);
      console.log("data",data);
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
            <div className="pt-1 pr-2 flex-1 flex flex-col items-end space-y-2">
                {(userState.uid !== uid) ? "" : <Button variant="contained" className="w-24" onClick={() => {setModalState({isUploadModalOpen: true});}}>
                  Edit
                </Button>}
            </div>
          </CardContent>
        </Card>
      </Grid>
      <EditModal />
    </div>
  );
}

export default UserContact;
