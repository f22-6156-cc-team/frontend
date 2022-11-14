import React, { useEffect, useState }  from 'react'
import ListingContainer from '../ListingContainer/ListingContainer';
import Box from '@mui/material/Box';
import axios from "axios";


const LandingPage = () => {

  const [listingsData, setListingsData] = useState(null);
  useEffect( ()=> {
    async function fetchListingsData() {
      try {
        const rsp = await axios.get(`https://gy8a0m85ci.execute-api.us-east-1.amazonaws.com/test/listings`);
        setListingsData(rsp.data);
        console.log(rsp.data);
      } catch(err) {
        console.log(err)
      }
    }
    fetchListingsData();
  }, []);

  return (
    <div>
      <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
        <ListingContainer listingsData={listingsData}/>
      </Box>
      
    </div>
  );
}

export default LandingPage;