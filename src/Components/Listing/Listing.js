import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Listing = (props) => {
    const data = props.listingData;
    const userId = data.authorUserId;
    const navigate = useNavigate();
    const navigateToUser = () => {
        navigate('/user/'+userId+'/contact');
    };
    const cardContent = ( data &&
        <div>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {data.listingName}
            </Typography>
            <Typography variant="h5" component="div">
                {data.locationArea}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {data.listingAddress}
            </Typography>
            <Typography variant="body2">
                {data.isActive}
            </Typography>
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