import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Grid from "@mui/material/Grid";
import "./LandingPage.css";
import { APIs } from "../../utils/api";
import { Card } from "@mui/material";
import { CardContent, Modal } from "@mui/material";
import { Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { listingsAtom, modalAtom } from "../../utils/store";
import { TextField } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Checkbox } from "@mui/material";
import { useRecoilState } from "recoil";

const LISTINGS_PER_PAGE = 8;

function UploadForm() {
  const [startDate, setStartDate] = useState("2022/11/28");
  const [endDate, setEndDate] = useState("2022/11/28");

  return (
    <>
      {[
        "listingName",
        "listingAddress",
        "locationArea",
        "washerDryerLocation",
      ].map((label) => (
        <TextField
          autoFocus
          margin="dense"
          id={label}
          label={label}
          key={label}
          type="text"
          fullWidth
          variant="standard"
        />
      ))}
      {[
        "currentResidentsNum",
        "totalResidentsNum",
        "price",
        "listingSize",
        "listingTotalSize",
        "floor",
      ].map((label) => (
        <TextField
          autoFocus
          margin="dense"
          id={label}
          label={label}
          key={label}
          type="number"
          fullWidth
          variant="standard"
        />
      ))}
      <DatePicker
        label="Start Date"
        inputFormat="YYYY/MM/DD"
        value={startDate}
        onChange={(v) => {
          setStartDate(v);
        }}
        renderInput={(params) => <TextField id={"startDate"} {...params} />}
      />
      <DatePicker
        label="End Date"
        inputFormat="YYYY/MM/DD"
        value={endDate}
        onChange={(v) => {
          setEndDate(v);
        }}
        renderInput={(params) => <TextField id={"endDate"} {...params} />}
      />
      {[
        "isActive",
        "isPetFriendly",
        "isSmokingFriendly",
        "hasMaintenance",
        "hasGym",
      ].map((label) => (
        <FormControlLabel
          control={<Checkbox id={label} />}
          key={label}
          label={label}
        />
      ))}
    </>
  );
}

function UploadModal() {
  const modalState = useRecoilValue(modalAtom);
  const setModalState = useSetRecoilState(modalAtom);
  const setListingsState = useSetRecoilState(listingsAtom);

  return (
    <Modal open={modalState.isUploadModalOpen}>
      <div className="bg-white w-1/3 h-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg px-14 py-8 overflow-scroll">
        <h3 className="text-2xl">Upload</h3>
        <p className="text-sm text-neutral-400">listing detail</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              const data = {
                // FIXME: what is uid in jwt
                authorUserId: 1,
                isActive: 1,
                listingName: "listing CCCCC",
                listingAddress: "test address B",
                currentResidentsNum: 3,
                totalResidentsNum: 7,
                price: 3000,
                locationArea: "10025",
                startDate: "2022/10/10",
                endDate: "2023/10/10",
                listingTotalSize: 500,
                listingSize: 400,
                floor: 9,
                hasElevator: 1,
                isPetFriendly: 0,
                isSmokingFriendly: 1,
                washerDryerLocation: "NA",
                hasMaintenance: 1,
                hasGym: 1,
              };

              // transform date type
              Array.from(event.target).forEach((item) => {
                if (!item.id) {
                  return;
                }

                if (item.type === "checkbox") {
                  data[item.id] = item.checked ? 1 : 0;
                  return;
                }

                if (item.type === "number") {
                  data[item.id] = parseInt(item.value);
                  return;
                }

                data[item.id] = item.value;
              });

              const resp = await APIs.createListing(data);
              if (resp) {
                setListingsState((curr) => ({
                  ...curr,
                  list: curr.list.concat(resp),
                }));
              }

              setModalState({
                isUploadModalOpen: false,
              });
            }}
          >
            <div className="grid grid-cols-2 gap-12">
              <UploadForm />
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <Button
                variant="outlined"
                onClick={() => {
                  setModalState({
                    isUploadModalOpen: false,
                  });
                }}
              >
                CANCEL
              </Button>
              <Button type="submit" variant="contained">
                SUBMIT
              </Button>
            </div>
          </form>
        </LocalizationProvider>
      </div>
    </Modal>
  );
}

const LandingPage = () => {
  const [listingsState, setListingsState] = useRecoilState(listingsAtom);
  useEffect(() => {
    async function fetchlistingsState() {
      const data = await APIs.getListings();
      setListingsState({
        list: data,
      });
    }
    fetchlistingsState();
  }, []);

  const [currPage, setCurrPage] = useState(0);
  const start = currPage * LISTINGS_PER_PAGE;
  const end = start + LISTINGS_PER_PAGE;
  const currentPageData = listingsState.list.slice(start, end);
  const pageCount = Math.ceil(listingsState.list.length / LISTINGS_PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrPage(selectedPage);
  }

  return (
    <div className="flex flex-col">
      <Grid className="m-auto grid grid-cols-4 gap-8 p-8 pt-16">
        {/* <ListingContainer listingsState={currentPageData}/> */}
        {currentPageData.map((listing) => (
          <Card
            variant="outlined"
            key={listing.listingId}
            className="hover:shadow-2xl shadow-md"
          >
            <CardContent className="flex flex-col w-96">
              <img src={listing.img} alt="preview" className="pb-2" />
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-2xl">{listing.listingName}</h3>
                <div className="text-sm">
                  {listing.startDate}-{listing.endDate}
                </div>
              </div>
              <div className="flex text-start items-start">
                <div className="pt-2 space-y-2">
                  <p>Address: {listing.listingAddress}</p>
                  <p>Location: {listing.locationArea}</p>
                </div>
                <div className="pt-1 pr-2 flex-1 flex flex-col items-end space-y-2">
                  <Button variant="contained" className="w-24">
                    Edit
                  </Button>
                  <Button variant="contained" color="error" className="w-24">
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </Grid>
      <Grid item container>
        <Grid item xs={12} sm={6} className="pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel={">"}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={"<"}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </Grid>
      </Grid>
      <UploadModal />
    </div>
  );
};

export default LandingPage;
