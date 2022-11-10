import * as React from 'react';
import Listing from '../Listing/Listing';


export default function ListingContainer( {listingsData} ) {
  
    return (
        <div className="container">
            {listingsData.map((listingData, index) => (
                <Listing listingData={listingData} key={listingData.listingId} />
            ))}
        </div>
    );
}
