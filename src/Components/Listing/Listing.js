import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Listing = ({ listingData }) => {

    const userId = listingData.authorUserId;
    const navigate = useNavigate();
    const navigateToUser = () => {
        navigate('/user/'+userId+'/contact');
    };

    return (
        <Card sx={{ width: 1/2 }} >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {listingData.listingName}
                </Typography>
                <Typography variant="h5" component="div">
                    {listingData.locationArea}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {listingData.listingAddress}
                </Typography>
                <Typography variant="body2">
                    {listingData.isActive}
                </Typography>
                <Button variant="outlined" onClick={navigateToUser}>
                    Contact listing owner
                </Button>
            </CardContent>
        </Card>
    );
};


export default Listing;