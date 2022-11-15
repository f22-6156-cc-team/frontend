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

    const listingDetails = (
        <div>
          <h3>{data?.listingName}</h3>
          <h4>
            <p>
                Location: {data?.locationArea}<br></br>
                Address: {data?.listingAddress}<br></br>
                Start date: {data?.startDate}<br></br>
                End date: {data?.endDate}<br></br>
            </p>
          </h4>
          <h4>-------Other information and preferences-------</h4>
          <p>
            Apartment size: {data?.listingTotalSize} Room size: {data?.listingSize}<br></br>
            Floor: {data?.floor}<br></br>
            In-building elevator: {data?.hasElevator ? "yes" : "no"}<br></br>
            In-building maintenance: {data?.hasMaintenance ? "yes" : "no"}<br></br>
            Dryer washer location: {data?.dryerWasherLocation}<br></br>
            Gym: {data?.hasGym ? "yes" : "no"}<br></br>
            Pet: {data?.isPetFriendly ? "yes" : "no"}<br></br>
            Smoking: {data?.isSmokingFriendly ? "yes" : "no"}<br></br>
            Listing active: {data?.isActive ? "yes" : "no"}<br></br>
          </p>
        </div>
    )

    const cardContent = ( data &&
        <div>
            {listingDetails}
            <Button variant="outlined" onClick={navigateToUser}>
                Contact listing owner
            </Button>
        </div>
    )

    return (
        <Card className="card">
            {console.log("card", data)}
            <CardContent>
                {cardContent}
            </CardContent>
        </Card>
    );
};

export default Listing;