import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIs } from '../../utils/api';
import { Grid,Container, Paper, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { faker } from "@faker-js/faker";
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
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
export default function ListingDetail() {
    const { lid } = useParams();
    const [listingData, setListingsData] = useState(null);

    useEffect(() => {
        async function fetchListingData() {
          const resp = await APIs.getOneListing(lid);
          setListingsData(resp)
        }
        fetchListingData();
      }, []);

  return (
    <Container maxWidth="md">
    {/* <div className='menu'>
        <h3>{listingData?.listingName}</h3>
        <h4>
        <p>
            Location: {listingData?.locationArea}<br></br>
            Address: {listingData?.listingAddress}<br></br>
            Start date: {listingData?.startDate}<br></br>
            End date: {listingData?.endDate}<br></br>
            Apartment size: {listingData?.listingTotalSize}<br></br>
            Room size: {listingData?.listingSize}<br></br>
            Floor: {listingData?.floor}<br></br>
            Dryer washer location: {listingData?.washerDryerLocation}<br></br>
            Price: {listingData?.price}<br></br>
            In-building elevator: {listingData?.hasElevator ? "yes" : "no"}<br></br>
            In-building maintenance: {listingData?.hasMaintenance ? "yes" : "no"}<br></br>
            Gym: {listingData?.hasGym ? "yes" : "no"}<br></br>
            Pet: {listingData?.isPetFriendly ? "yes" : "no"}<br></br>
            Smoking: {listingData?.isSmokingFriendly ? "yes" : "no"}<br></br>
            Listing active: {listingData?.isActive ? "yes" : "no"}<br></br>
        </p>
        </h4>
    </div> */}
    <Card>
    {/* <Icon classes={{root: classes.iconRoot}}>
      <img className={classes.imageIcon} src="/graphics/firebase-logo.svg"/>
    </Icon>
      <CardMedia
        component="svg"
        height="140"
        image= "../../assets/rental.svg"
        alt="rental logo"
      /> */}
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Typography gutterBottom variant="h2" component="div">
              {listingData?.listingName}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography gutterBottom variant="h5" component="div">
              $ {listingData?.price} <Typography variant="body2" color="text.secondary">
              per month
            </Typography>
            </Typography>
          </Grid>
          <Grid item md={6}>
            {/* <Card> */}

          <LocationOnIcon/>  {listingData?.listingAddress}, {listingData?.locationArea}
            {/* </Card> */}
          </Grid>
          {/* <Grid item md={3}>
          Address: {listingData?.listingAddress}
          </Grid> */}
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

        {/* <Typography variant="body2" color="text.secondary">
           per month
        </Typography> */}
        </Grid>
      </CardContent>

      <CardActions>
        <Button variant="outlined">Back to list</Button>
        <Button variant="outlined" startIcon={<EditIcon />}>
          Edit
        </Button>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </CardActions>
    </Card>
    </Container>
  
  )
}
