import * as React from 'react';
import React, { useState, useEffect } from 'react';
import Listing from '../Listing/Listing';


export default function ListingContainer() {

    const [listingsData, setListingsData] = useState([]);

    useEffect(async () => {
        // get all listing data
        let json;
        try {
            const response = await fetch('/listings');
            const json = await response.json();
        } catch (error) {
            console.log(error);
            json = [];
        }
        setListingsData(json);
        // const res = response.json();
        // res.then(data => setCurrentTime(data.time));
    }, []);
  
    return (
        <div>
            {listingsData.map((listingData, index) => (
                <Listing listingData={listingData} key={listing.listingId} />
            ))}
        </div>
    );
}
