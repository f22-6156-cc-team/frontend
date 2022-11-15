import * as React from 'react';
import Grid from '@mui/material/Grid'
import Listing from '../Listing/Listing';


export default function ListingContainer( {listingsData} ) {
    return (
        <div style={{ padding: 30 }}>

            {listingsData && listingsData.map((listing, index) => (
                <Grid container spacing={10} justify="center">
                    <Grid item xs={12} justify="center">
                        <Listing listingData={listing} key={listing.listingId} />
                    </Grid>
                </Grid>
            ))}
        </div>
    );
}
