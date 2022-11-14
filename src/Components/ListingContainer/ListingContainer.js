import * as React from 'react';
import Listing from '../Listing/Listing';


export default function ListingContainer( {listingsData} ) {
  
    return (
        <div className="container">
    {/* {console.log(listingsData)} */}
            {listingsData && listingsData.map((listing, index) => (
                <Listing listingData={listing} key={listing.listingId} />
            ))}
        </div>
    );
}
