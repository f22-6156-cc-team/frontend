import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function Listing() {
  return (
    <Card sx={{ width: 1/2 }} >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Listing owner/userID
        </Typography>
        <Typography variant="h5" component="div">
          Listing Title/Name
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Listing address
        </Typography>
        <Typography variant="body2">
          Listing description
        </Typography>
      </CardContent>
    </Card>
  );
}
