import React, { useEffect, useState }  from 'react'
import ListingContainer from '../ListingContainer/ListingContainer';
import ReactPaginate from "react-paginate";
import Grid from '@mui/material/Grid'
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

  const [currPage, setCurrPage] = useState(0);
  const start = currPage * LISTINGS_PER_PAGE;
  const end = start + LISTINGS_PER_PAGE;
  const currentPageData = listingsData?.slice(start, end);
  const pageCount = Math.ceil(listingsData?.length/LISTINGS_PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrPage(selectedPage); 
  };
 
  return (    
      <Grid container spacing={2}>
        <Grid item container direction="col" justify="flex" xs={12}>
          <Grid item xs={12} sm={12} justify="center">
              <ListingContainer listingsData={currentPageData}/>
          </Grid>
        </Grid>
        <Grid item container direction="col">
          <Grid item xs={12} sm={6} className='pagination'>
                <ReactPaginate breakLabel="..."
                              nextLabel={">"}
                              onPageChange={handlePageClick}
                              pageRangeDisplayed={5}
                              pageCount={pageCount}
                              previousLabel={"<"}
                              containerClassName={"pagination"}
                              previousLinkClassName={"pagination__link"}
                              nextLinkClassName={"pagination__link"}
                              disabledClassName={"pagination__link--disabled"}
                              activeClassName={"pagination__link--active"}/>
          </Grid>
        </Grid>
    </Grid>
  );
}

export default LandingPage;