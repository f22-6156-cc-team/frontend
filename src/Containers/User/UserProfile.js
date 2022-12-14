import React, { useState } from "react";
import Sidebar from "../UserSidebar/Sidebar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { APIs } from "../../utils/api";
import { Card } from "@mui/material";
import { CardContent, Modal } from "@mui/material";
import "./User.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { listingsAtom, modalAtom, snackBarAtom } from "../../utils/store";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { JWT_NAME } from "../../utils/const";
import { useRecoilState } from "recoil";
import { userAtom } from "../../utils/store";

function UserProfile (props) {
  const { uid } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const modalState = useRecoilValue(modalAtom);
  const setModalState = useSetRecoilState(modalAtom);
  const setSnackBarState = useSetRecoilState(snackBarAtom);

  function EditForm() {
    return (
      <>
        <TextField autoFocus margin="dense" id={"username"} label={"User Name"} type="text" fullWidth variant="standard" defaultValue={userProfile?.username}/>
        <TextField autoFocus margin="dense" id={"firstName"} label={"First Name"} type="text" fullWidth variant="standard" defaultValue={userProfile?.firstName}/>
        <TextField autoFocus margin="dense" id={"lastName"} label={"Last Name"} type="text" fullWidth variant="standard" defaultValue={userProfile?.lastName}/>
      </>
    );
  }
  
  function EditModal() {
    return (
      <Modal open={modalState.isUploadModalOpen}>
        <div className="bg-white w-1/3 h-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg px-14 py-8 overflow-scroll">
          <h3 className="text-2xl">Edit Your Profile</h3>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const data = { username: userProfile?.username,
                               firstName: userProfile?.firstName,
                               lastName: userProfile?.lastName };
                Array.from(e.target).forEach((item) => {
                  data[item.id] = item.value;
              });
                const resp = await APIs.editUser(uid, data);
                console.log(resp);
  
                setModalState({
                  isUploadModalOpen: false,
                });

                if(resp){
                  window.location.reload();
                }else{
                  setSnackBarState((prev) => ({
                    ...prev,
                    isOpen: true,
                    message: "Invalid Input",
                    severity: "warning",
                  }));
                }
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

  useEffect( ()=> {
    async function fetchUserData() {
      const resp = await APIs.getUserProfile(uid);
      setUserProfile(resp);
    }
    fetchUserData();
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
              <h3 className="font-bold text-2xl">{userProfile?.username}</h3>
            </div>
            <div className="flex text-start items-start">
              <div className="pt-2 space-y-2">
                <p>User ID: {userProfile?.userId}</p>
                <p>First Name: {userProfile?.firstName}</p>
                <p>Last Name: {userProfile?.lastName}</p>
              </div>
              <div>
              {(window.profile == undefined) ? '' : (window.profile ? "Successfully Updated" : "Invalid Input")} 
              </div>
            </div>
            <div className="pt-1 pr-2 flex-1 flex flex-col items-end space-y-2">
                <Button variant="contained" className="w-24" onClick={() => {setModalState({isUploadModalOpen: true});}}>
                  Edit
                </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <EditModal />
    </div>
  );
}

export default UserProfile;
