import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIs } from '../../utils/api';

export default function ListingDetail() {
    const { lid } = useParams();
    const [listingData, setListingsData] = useState(null);

    useEffect(() => {
        async function fetchListingData() {
          const resp = await APIs.getOneListing(lid);
          setListingsData(resp)
        }
        fetchListingData();
      }, []);

  return (
    <div className='menu'>
        <h3>{listingData?.listingName}</h3>
        <h4>
        <p>
            Location: {listingData?.locationArea}<br></br>
            Address: {listingData?.listingAddress}<br></br>
            Start date: {listingData?.startDate}<br></br>
            End date: {listingData?.endDate}<br></br>
            Apartment size: {listingData?.listingTotalSize}<br></br>
            Room size: {listingData?.listingSize}<br></br>
            Floor: {listingData?.floor}<br></br>
            Dryer washer location: {listingData?.washerDryerLocation}<br></br>
            Price: {listingData?.price}<br></br>
            In-building elevator: {listingData?.hasElevator ? "yes" : "no"}<br></br>
            In-building maintenance: {listingData?.hasMaintenance ? "yes" : "no"}<br></br>
            Gym: {listingData?.hasGym ? "yes" : "no"}<br></br>
            Pet: {listingData?.isPetFriendly ? "yes" : "no"}<br></br>
            Smoking: {listingData?.isSmokingFriendly ? "yes" : "no"}<br></br>
            Listing active: {listingData?.isActive ? "yes" : "no"}<br></br>
        </p>
        </h4>
    </div>
  )
}
