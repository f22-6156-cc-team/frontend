import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Listing = (props) => {
    const data = props.listingData;
    const userId = data.authorUserId;
    const navigate = useNavigate();
    const navigateToUser = () => {
        navigate('/user/'+userId+'/contact');
    };

    const displayListing = () => {
        const active = data.isActive ? "yes" : "no";
        const elevator = data.hasElevator ? "yes" : "no";
        const pet = data.isPetFriendly ? "yes" : "no";
        const smoking = data.isSmokingFriendly ? "yes" : "no";
        const maintenance = data.hasMaintenance ? "yes" : "no";
        const gym = data.hasGym ? "yes" : "no";
      return (
        <div className="listing">
          <h2>Listing: {data.listingName}</h2>
          <h2>Location: {data.locationArea}</h2>
          <h3>Address: {data.listingAddress}</h3>
          <h3>Start date: {data.startDate}</h3>
          <h3>End date: {data.endDate}</h3>
          <h3>Other information and preferences:</h3>
          <h4>Apartment size: {data.listingTotalSize} Room size: {data.listingSize}</h4>
          <h4>Floor: {data.floor}</h4>
          <h4>In-building elevator: {elevator}</h4>
          <h4>In-building maintenance: {maintenance}</h4>
          <h4>Dryer washer location: {data.dryerWasherLocation}</h4>
          <h4>Gym: {gym}</h4>
          <h4>Pet: {pet}</h4>
          <h4>Smoking: {smoking}</h4>
          <h4>Listing active: {active}</h4>
          <h4></h4>
        </div>
      );
    };

    const cardContent = ( data &&
        <div>
            {displayListing}
            <Button variant="outlined" onClick={navigateToUser}>
                Contact listing owner
            </Button>
        </div>
    )
    return (
        <Card className="card">
            <CardContent>
                {cardContent}
            </CardContent>
        </Card>
    );
};


export default Listing;