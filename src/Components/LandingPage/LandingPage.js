import React from 'react'
import ListingContainer from '../ListingContainer/ListingContainer';
import Box from '@mui/material/Box';
import { ListingContainerData } from '../../Assets/ListingContainerData';

function LandingPage() {

    const listingsData = ListingContainerData;

    // const [listingsData, setListingsData] = useState([]);
    // useEffect(async () => {
    //     // get all listing data
    //     let json;
    //     try {
    //         const response = await fetch('/listings');
    //         const json = await response.json();
    //     } catch (error) {
    //         console.log(error);
    //         json = [];
    //     }
    //     setListingsData(json);
    //     // const res = response.json();
    //     // res.then(data => setCurrentTime(data.time));
    // }, []);


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