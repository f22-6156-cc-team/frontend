import * as React from 'react';
import Grid from '@mui/material/Grid'
import Listing from '../Listing/Listing';


export default function ListingContainer( {listingsData} ) {
    return (
        <div style={{ padding: 30 }} className="container">
            {listingsData && listingsData.map((listing, index) => (
                <Grid container spacing={10} justify="center">
                    <Grid item xs={12} lg={12}>
                        <Listing listingData={listing} key={listing.listingId} />
                    </Grid>
                </Grid>
            ))}
        </div>
    );
}
