import Sidebar from "../UserSidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./User.css";
import { APIs } from "../../utils/api";
import { Card, CardContent, Modal, Select, MenuItem, Grid, Button, InputLabel, FormControl} from "@mui/material";
import "./User.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalAtom, userExpSelector, snackBarAtom } from "../../utils/store";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { JWT_NAME } from "../../utils/const";
import { Label } from "@mui/icons-material";

function UserPreference() {
  const { uid } = useParams();
  const [userPreferenceData, setUserPreferenceData] = useState(null);
  const modalState = useRecoilValue(modalAtom);
  const setModalState = useSetRecoilState(modalAtom);
  const [wake, setWake] = useState("before 7AM");
  const [sleep, setSleep] = useState("before 10PM");
  const [gender, setGender] = useState("Female");
  const [cook, setCook] = useState("never");
  const [clean, setClean] = useState("never");
  const [pet, setPet] = useState("1");
  const [smoke, setSmoke] = useState("1");
  const [party, setParty] = useState("1");
  const [guest, setGuest] = useState("1");
  const onGender = (e) => setGender(e.target.value);
  const onCook= (e) => setCook(e.target.value);
  const onClean = (e) => setClean(e.target.value);
  const onPet = (e) => setPet(e.target.value);
  const onSmoke = (e) => setSmoke(e.target.value);
  const onParty = (e) => setParty(e.target.value);
  const onGuest = (e) => setGuest(e.target.value);

  function handleWake(e){
    setWake(e.target.value);
  }

  function handleSleep(e){
    setSleep(e.target.value);
  }

  function EditForm() {
    return (
      <>
        <FormControl>
        <InputLabel id="test-select-label">Gender Requirement</InputLabel>
        <Select labelId="test-select-label" label="Gender Requirement" onChange={onGender} defaultValue="Female" value={gender}>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
        </FormControl>

        <FormControl>
        <InputLabel id="test-select-label">Wakeup Time</InputLabel>
        <Select labelId="test-select-label" label="Wakeup Time" onChange={handleWake} defaultValue="before 7AM" value={wake}>
          <MenuItem value="before 7AM">before 7AM</MenuItem>
          <MenuItem value="7AM to 9AM">7AM to 9AM</MenuItem>
          <MenuItem value="after 9AM">after 9AM</MenuItem>
        </Select>
        </FormControl>

        <FormControl>
        <InputLabel id="test-select-label">Sleeping Time</InputLabel>
        <Select labelId="test-select-label" label="Sleeping Time" onChange={handleSleep} defaultValue="before 10PM" value={sleep}>
          <MenuItem value="before 10PM">before 10PM</MenuItem>
          <MenuItem value="10PM to 12PM">10PM to 12PM</MenuItem>
          <MenuItem value="after 12PM">after 12PM</MenuItem>
        </Select>
        </FormControl>

        <FormControl>
        <InputLabel id="test-select-label">Cooking Frequency</InputLabel>
        <Select labelId="test-select-label" label="Cooking Frequency" onChange={onCook} defaultValue="never" value={cook}>
          <MenuItem value="never">Never</MenuItem>
          <MenuItem value="rarely">Rarely</MenuItem>
          <MenuItem value="often">Often</MenuItem>
          <MenuItem value="everyday">Everyday</MenuItem>
        </Select>
        </FormControl>

        <FormControl>
        <InputLabel id="test-select-label">Cleaning Frequency</InputLabel>
        <Select labelId="test-select-label" label="Cleaning Frequency" onChange={onClean} defaultValue="never" value={clean}>
          <MenuItem value="never">Never</MenuItem>
          <MenuItem value="rarely">Rarely</MenuItem>
          <MenuItem value="often">Often</MenuItem>
          <MenuItem value="everyday">Everyday</MenuItem>
        </Select>
        </FormControl>

       <FormControl>
       <InputLabel id="test-select-label">Pet Friendly</InputLabel>
       <Select labelId="test-select-label" label="Pet Friendly" onChange={onPet} defaultValue="1" value={pet}>
          <MenuItem value="1">Yes</MenuItem>
          <MenuItem value="0">No</MenuItem>
       </Select>
       </FormControl>

      <FormControl>
      <InputLabel id="test-select-label">Smoking Friendly</InputLabel>
      <Select labelId="test-select-label" label="Smoking Friendly" onChange={onSmoke} defaultValue="1" value={smoke}>
          <MenuItem value="1">Yes</MenuItem>
          <MenuItem value="0">No</MenuItem>
      </Select>
      </FormControl>

      <FormControl>
      <InputLabel id="test-select-label">Party Friendly</InputLabel>
      <Select labelId="test-select-label" label="Party Friendly" onChange={onParty} defaultValue="1" value={party}>
          <MenuItem value="1">Yes</MenuItem>
          <MenuItem value="0">No</MenuItem>
      </Select>
      </FormControl>

      <FormControl>
      <InputLabel id="test-select-label">Guest Friendly</InputLabel>
      <Select labelId="test-select-label" label="Guest Friendly" onChange={onGuest} defaultValue="1" value={guest}>
          <MenuItem value="1">Yes</MenuItem>
          <MenuItem value="0">No</MenuItem>
      </Select>
      </FormControl>
      </>
    );
  }

  function EditModal() {
    return (
      <Modal open={modalState.isUploadModalOpen}>
        <div className="bg-white w-1/3 h-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg px-14 py-8 overflow-scroll">
          <h3 className="text-2xl">Edit Your Preference</h3>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const data = {wakeupTime: wake,
                              sleepingTime: sleep,
                              cleaningFrequency: clean,
                              cookingFrequency: cook,
                              gender: gender,
                              isGuestWelcome: guest,
                              isPartyFriendly: party,
                              isSmokingFriendly: smoke,
                              isPetFriendly: pet
                              };
                const resp = await APIs.editPreference(uid, data);
                console.log(resp);
                setModalState({
                  isUploadModalOpen: false,
                });
                // console.log("debug")
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
    async function fetchUserPreferenceData() {
      const resp = await APIs.getPreference(uid);
      console.log("pref",resp)
      setUserPreferenceData(resp);
    }
    fetchUserPreferenceData();
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
              <h3 className="font-bold text-2xl">User Preference</h3>
            </div>
            <div className="flex text-start items-start">
              <div className="pt-2 space-y-2">
                <p>Wakeup Time: {userPreferenceData?.wakeupTime}</p>
                <p>Sleeping Time: {userPreferenceData?.sleepingTime}</p>
                <p>Cooking Frequency: {userPreferenceData?.cookingFrequency}</p>
                <p>Cleaning Frequency: {userPreferenceData?.cleaningFrequency}</p>
                <p>Gender Requirement: {userPreferenceData?.gender}</p>
                <p>Guest Friendly: {userPreferenceData?.isGuestWelcome ? "Yes" : "No"}</p>
                <p>Party Friendly: {userPreferenceData?.isPartyFriendly ? "Yes" : "No"}</p>
                <p>Pet Friendly: {userPreferenceData?.isPetFriendly ? "Yes" : "No"}</p>
                <p>Smoking Friendly: {userPreferenceData?.isSmokingFriendly ? "Yes" : "No"}</p>
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

export default UserPreference;
