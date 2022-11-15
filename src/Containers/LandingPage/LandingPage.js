import React, { useEffect, useState }  from 'react'
import ListingContainer from '../ListingContainer/ListingContainer';
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import './LandingPage.css';

const LISTINGS_PER_PAGE = 3;

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

  const [currPage, setCurrPage] = useState(1);
  const [currentPageData, setcurrentPageData] = useState(null);
  const pageNum = Math.ceil(listingsData?.length/LISTINGS_PER_PAGE);
  
  useEffect( ()=> {
    const start = (currPage - 1) * LISTINGS_PER_PAGE;
    const end = start + LISTINGS_PER_PAGE;
    setcurrentPageData(listingsData?.slice(start, end));
  }, [currPage]);

  const handleChange = (event, value) => {
    setCurrPage(value);
  };

 
  return (    
    <div className='container'>
        <div className='listings'>
          <ListingContainer listingsData={currentPageData}/>
        </div>
        <div className='pagination'>
          <Pagination count={pageNum} 
                      color="primary" 
                      defaultPage={1} 
                      page={currPage} 
                      boundaryCount={2} 
                      onChange={handleChange}/>
        </div>
    </div>
  );
}

export default LandingPage;