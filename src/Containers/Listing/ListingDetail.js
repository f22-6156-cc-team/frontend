import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate, useParams } from 'react-router-dom';
import { APIs } from '../../utils/api';
import { Grid,Container, Paper, Card, CardMedia, CardContent, Typography, CardActions, Button, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import StairsIcon from '@mui/icons-material/Stairs';
import ElevatorIcon from '@mui/icons-material/Elevator';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import PetsIcon from '@mui/icons-material/Pets';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { TextField } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Checkbox } from "@mui/material";
import { useRecoilState } from "recoil";
import Badge from '@mui/material/Badge';
import {
  LISTING_MODAL_ACTIONS,
  listingAtom,
  listingsAtom,
  modalAtom,
  snackBarAtom,
  userExpSelector,
} from "../../utils/store";


export default function ListingDetail(props) {
    const { lid } = useParams();
    const [listingData, setListingsData] = useState(null);
    const [userContactData, setUserContactData] = useState(null);
    const setListingState = useSetRecoilState(listingAtom);
    const setModalState = useSetRecoilState(modalAtom);
    const setSnackBarState = useSetRecoilState(snackBarAtom);
    const viewerUid = props.userState.uid;
    const navigate = useNavigate();
    const isViewerOwner = props.userState.uid == listingData?.authorUserId;
    function ListingModalContent() {
      /** upload or edit */
      const modalState = useRecoilValue(modalAtom);
      const listingState = useRecoilValue(listingAtom);
      const setModalState = useSetRecoilState(modalAtom);
      const setListingsState = useSetRecoilState(listingsAtom);
      
    
      useEffect(() => {
        if (modalState.listingModalAction !== LISTING_MODAL_ACTIONS.EDIT) {
          return;
        }
    
        [
          "listingName",
          "listingAddress",
          "locationArea",
          "washerDryerLocation",
          "currentResidentsNum",
          "totalResidentsNum",
          "price",
          "listingSize",
          "listingTotalSize",
          "floor",
          "startDate",
          "endDate",
          "isPetFriendly",
          "isSmokingFriendly",
          "hasMaintenance",
          "hasGym",
        ].forEach((label) => {
          const element = document.getElementById(label);
          element.value = listingState[label];
        });
      }, [listingState, modalState.listingModalAction]);
    
      return (
        <div
          className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg px-14 py-8 overflow-scroll"
          style={{ width: "700px" }}
        >
          <h3 className="text-2xl">{modalState.listingModalAction}</h3>
          <p className="text-sm text-neutral-400">listing detail</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
    
                const data = {
                  // FIXME: what is uid in jwt
                  authorUserId: 1,
                  listingName: "listing CCCCC",
                  listingAddress: "test address B",
                  currentResidentsNum: 3,
                  totalResidentsNum: 7,
                  price: 3000,
                  locationArea: "10025",
                  startDate: "2022/10/10",
                  endDate: "2023/10/10",
                  listingTotalSize: 500,
                  listingSize: 400,
                  floor: 9,
                  hasElevator: 1,
                  isPetFriendly: 0,
                  isSmokingFriendly: 1,
                  washerDryerLocation: "NA",
                  hasMaintenance: 1,
                  hasGym: 1,
                };
    
                // transform date type
                Array.from(event.target).forEach((item) => {
                  if (!item.id) {
                    return;
                  }
    
                  if (item.type === "checkbox") {
                    data[item.id] = item.checked ? 1 : 0;
                    return;
                  }
    
                  if (item.type === "number") {
                    data[item.id] = parseInt(item.value);
                    return;
                  }
                  data[item.id] = item.value;
                });

                const addr = data['listingAddress'];
                APIs.getValidatedAddress(addr).then(resp => {
                  console.log(resp);
                  setSnackBarState((prev) => ({
                    ...prev,
                    isOpen: true,
                    message: 'please consider using this suggested formatted address: ' + resp?.result.address.formattedAddress,
                    severity: "success",
                  })
                )});            
    
                // TODO: edit
                let resp;
            
                let msg = "";
                if (
                  modalState.listingModalAction === LISTING_MODAL_ACTIONS.UPLOAD
                ) {
                  resp = await APIs.createListing(data);
                  msg = `Upload listing: ${resp.listingName}`;
                } else if (
                  modalState.listingModalAction === LISTING_MODAL_ACTIONS.EDIT
                ) {
                  console.log("data before", data);
                  resp = await APIs.updateListing(listingData.listingId, data);
                  console.log(listingData);
                  console.log("update resp", resp)
                  msg = `Update listing: ${resp?.listingName}`;
                } else {
                  throw new Error("Not Implemented");
                }
    
                if (resp) {
                  setListingsData(resp)
                  // setListingsState(newListingsStateCallback);
                  setSnackBarState((prev) => ({
                    ...prev,
                    isOpen: true,
                    message: msg,
                    severity: "success",
                  }));
                } else {
                  setSnackBarState((prev) => ({
                    ...prev,
                    isOpen: true,
                    message: "error occured",
                    severity: "warning",
                  }));
                }
    
                setModalState({
                  isListingModalOpen: false,
                });
              }}
            >
              <div className="grid grid-cols-2 gap-12">
                <ListingForm
                  shrinkDefault={
                    modalState.listingModalAction === LISTING_MODAL_ACTIONS.EDIT
                  }
                />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <Button
                  variant="outlined"
                  onClick={() => {
                    setModalState({
                      isListingModalOpen: false,
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
      );
    }
    function ListingForm({ shrinkDefault }) {
  const [startDate, setStartDate] = useState("2022/11/28");
  const [endDate, setEndDate] = useState("2022/11/28");

  return (
    <>
      {[
        "listingName",
        "listingAddress",
        "locationArea",
        "washerDryerLocation",
      ].map((label) => (
        <TextField
          autoFocus
          margin="dense"
          id={label}
          label={label}
          key={label}
          type="text"
          fullWidth
          variant="standard"
          {...(shrinkDefault && { InputLabelProps: { shrink: true } })}
        />
      ))}
      {[
        "currentResidentsNum",
        "totalResidentsNum",
        "price",
        "listingSize",
        "listingTotalSize",
        "floor",
      ].map((label) => (
        <TextField
          autoFocus
          margin="dense"
          id={label}
          label={label}
          key={label}
          type="number"
          fullWidth
          variant="standard"
          {...(shrinkDefault && { InputLabelProps: { shrink: true } })}
        />
      ))}
      <DatePicker
        label="Start Date"
        inputFormat="YYYY/MM/DD"
        value={startDate}
        onChange={(v) => {
          setStartDate(v);
        }}
        renderInput={(params) => <TextField id={"startDate"} {...params} />}
        // {...(shrinkDefault && { InputLabelProps: { shrink: true } })}
      />
      <DatePicker
        label="End Date"
        inputFormat="YYYY/MM/DD"
        value={endDate}
        onChange={(v) => {
          setEndDate(v);
        }}
        renderInput={(params) => <TextField id={"endDate"} {...params} />}
        // {...(shrinkDefault && { InputLabelProps: { shrink: true } })}
      />
      {["isPetFriendly", "isSmokingFriendly", "hasMaintenance", "hasGym"].map(
        (label) => (
          <FormControlLabel
            control={<Checkbox id={label} />}
            key={label}
            label={label}
            // {...(shrinkDefault && { InputLabelProps: { shrink: true } })}
          />
        )
      )}
    </>
  );
    }
    function ListingModal() {
      /** upload or edit */
      const modalState = useRecoilValue(modalAtom);
    
      return (
        <Modal open={modalState.isListingModalOpen}>
          <ListingModalContent />
        </Modal>
      );
    }
    const Mailto = ({ email, subject, body, children }) => {
      return (
        <Button variant="outlined" 
        startIcon={<ContactMailIcon />}
        color="success" href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</Button>
      );
    };
    useEffect(() => {
        async function fetchListingData() {
          const resp = await APIs.getOneListing(lid);
          setListingsData(resp)
        }
        fetchListingData();
      }, [setListingState]);
    useEffect(() => {
    async function fetchUserContactData(uid) {
      if (!uid || userContactData) {
        return;
      }
      const data = await APIs.getContact(uid);
      console.log(data);
      setUserContactData(data);
    }
    fetchUserContactData(listingData?.authorUserId);}, [listingData, setListingsData]);
    const badgeContent = isViewerOwner ? "Your listing" : null;
  if (!listingData) {
    return "Listing does not exist."
  }
  return (
    <Container maxWidth="md">
    <Card>
      <CardContent>
        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item md={8}>
          <Badge badgeContent={badgeContent} color="primary">
            <Typography gutterBottom variant="h2" component="div">
              {listingData?.listingName}
            </Typography>
          </Badge>
          </Grid>
          <Grid item md={4}>
            <Typography gutterBottom variant="h5" component="div">
              $ {listingData?.price} <Typography variant="body2" color="text.secondary">
              per month
            </Typography>
            </Typography>
          </Grid>
          <Grid item md={6}>

          <LocationOnIcon/>  {listingData?.listingAddress}, {listingData?.locationArea}
          </Grid>
          <Grid item md={6}>
          <DateRangeIcon/> {listingData?.startDate} - {listingData?.endDate}
          </Grid>
          <Grid item md={6}>
          <ApartmentIcon/> Room size: {listingData?.listingSize}
          </Grid>
          <Grid item md={6}>
          <FitnessCenterIcon/> {listingData?.hasGym ? "yes" : "no"}
          </Grid>
          <Grid item md={6}>
          <StairsIcon/> {listingData?.floor}
          </Grid>
          <Grid item md={6}>
          <LocalLaundryServiceIcon/> {listingData?.washerDryerLocation}
          </Grid>
          <Grid item md={6}>
          <ElevatorIcon/> {listingData?.hasElevator ? "yes" : "no"}
          </Grid>
          <Grid item md={6}>
          <HomeRepairServiceIcon/> {listingData?.hasMaintenance ? "yes" : "no"}
          </Grid>
          <Grid item md={6}>
            <PetsIcon/> {listingData?.isPetFriendly ? "yes" : "no"}
          </Grid>
          <Grid item md={6}>
          {listingData?.isSmokingFriendly ? <SmokingRoomsIcon/> : <SmokeFreeIcon/>}
          </Grid>
          <Grid item md={6}>
          Active{listingData?.isActive ? <ToggleOnIcon/> : <ToggleOffIcon/>}
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button variant="outlined"
          onClick={() => navigate(-1)}>Back to list
        </Button>
        {isViewerOwner &&
        <>
        <Button variant="outlined" 
          onClick={() => {
            setListingState(listingData);
            setModalState((prev) => ({
              ...prev,
              isListingModalOpen: true,
              listingModalAction: LISTING_MODAL_ACTIONS.EDIT,
            }));
          }}
          startIcon={<EditIcon />}>
          Edit
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<DeleteIcon />}
          color="error"
          onClick={async () => {
            // TODO: check user ownership
            const resp = await APIs.deleteListing(listingData.listingId);
            if (resp?.status === 200) {
              setListingsData(null);
              setSnackBarState((prev) => ({
                ...prev,
                isOpen: true,
                message: `Delete listing: ${listingData.listingName}`,
                severity: "success",
              }));
            } else {
              // error message
              const msg = resp?.response?.data
                ? `ERROR: ${resp.response.data}`
                : `ERROR: Failed to delete listing: ${listingData.listingName}`;
              setSnackBarState((prev) => ({
                ...prev,
                isOpen: true,
                message: msg,
                severity: "error",
              }));
            }
          }}
          >
          Delete
        </Button> 
        </>
        }
        {!isViewerOwner && userContactData && 
        <Mailto email={userContactData?.emails[0]?.address} subject="Hello & Welcome" body="Hi! I was wondering if your listing is still available? I'm interested in it.">
          Contact Owner!
        </Mailto>
        }
      </CardActions>
    </Card>
    <ListingModal />
    </Container>
  
  )
}
