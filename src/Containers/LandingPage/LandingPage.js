import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Grid from "@mui/material/Grid";
import "./LandingPage.css";
import { APIs } from "../../utils/api";
import { Card } from "@mui/material";
import { CardContent, Modal } from "@mui/material";
import { Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  LISTING_MODAL_ACTIONS,
  listingAtom,
  listingsAtom,
  modalAtom,
  snackBarAtom,
  userExpSelector,
} from "../../utils/store";
import { TextField } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Checkbox } from "@mui/material";
import { useRecoilState } from "recoil";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { comment } from "postcss";
const LISTINGS_PER_PAGE = 8;

function ListingForm({ shrinkDefault }) {
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
          {...(shrinkDefault && { InputLabelProps: { shrink: true } })}
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
          {...(shrinkDefault && { InputLabelProps: { shrink: true } })}
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
        // {...(shrinkDefault && { InputLabelProps: { shrink: true } })}
      />
      <DatePicker
        label="End Date"
        inputFormat="YYYY/MM/DD"
        value={endDate}
        onChange={(v) => {
          setEndDate(v);
        }}
        renderInput={(params) => <TextField id={"endDate"} {...params} />}
        // {...(shrinkDefault && { InputLabelProps: { shrink: true } })}
      />
      {["isPetFriendly", "isSmokingFriendly", "hasMaintenance", "hasGym"].map(
        (label) => (
          <FormControlLabel
            control={<Checkbox id={label} />}
            key={label}
            label={label}
            // {...(shrinkDefault && { InputLabelProps: { shrink: true } })}
          />
        )
      )}
    </>
  );
}

function ListingModalContent() {
  /** upload or edit */
  const modalState = useRecoilValue(modalAtom);
  const listingState = useRecoilValue(listingAtom);
  const setModalState = useSetRecoilState(modalAtom);
  const setListingsState = useSetRecoilState(listingsAtom);
  const setSnackBarState = useSetRecoilState(snackBarAtom);

  useEffect(() => {
    if (modalState.listingModalAction !== LISTING_MODAL_ACTIONS.EDIT) {
      return;
    }

    [
      "listingName",
      "listingAddress",
      "locationArea",
      "washerDryerLocation",
      "currentResidentsNum",
      "totalResidentsNum",
      "price",
      "listingSize",
      "listingTotalSize",
      "floor",
      "startDate",
      "endDate",
      "isPetFriendly",
      "isSmokingFriendly",
      "hasMaintenance",
      "hasGym",
    ].forEach((label) => {
      const element = document.getElementById(label);
      element.value = listingState[label];
    });
  }, [listingState, modalState.listingModalAction]);

  return (
    <div
      className="bg-white  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg px-14 py-8 overflow-scroll"
      style={{ width: "700px" }}
    >
      <h3 className="text-2xl">{modalState.listingModalAction}</h3>
      <p className="text-sm text-neutral-400">listing detail</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const data = {
              // FIXME: what is uid in jwt
              authorUserId: 1,
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

            // TODO: edit
            let resp;
            // create default
            let newListingsStateCallback = (curr) => ({
              ...curr,
              list: curr.list.concat(resp),
            });
            let msg = "";
            console.log(modalState.listingModalAction);
            if (
              modalState.listingModalAction === LISTING_MODAL_ACTIONS.UPLOAD
            ) {
              resp = await APIs.createListing(data);
              msg = `Upload listing: ${resp.listingName}`;
              console.log(resp)
            } else if (
              modalState.listingModalAction === LISTING_MODAL_ACTIONS.EDIT
            ) {
              resp = await APIs.updateListing(listingState.listingId, data);
              msg = `Update listing: ${resp.listingName}`;
              newListingsStateCallback = (curr) => ({
                ...curr,
                list: curr.list.map((item) => {
                  if (item.listingId !== listingState.listingId) {
                    return item;
                  }

                  return {
                    ...item,
                    ...resp,
                  };
                }),
              });
            } else {
              throw new Error("Not Implemented");
            }

            if (resp) {
              setListingsState(newListingsStateCallback);
              setSnackBarState((prev) => ({
                ...prev,
                isOpen: true,
                message: msg,
                severity: "success",
              }));
            }

            setModalState({
              isListingModalOpen: false,
            });
          }}
        >
          <div className="grid grid-cols-2 gap-12">
            <ListingForm
              shrinkDefault={
                modalState.listingModalAction === LISTING_MODAL_ACTIONS.EDIT
              }
            />
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <Button
              variant="outlined"
              onClick={() => {
                setModalState({
                  isListingModalOpen: false,
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
  );
}

function ListingModal() {
  /** upload or edit */
  const modalState = useRecoilValue(modalAtom);

  return (
    <Modal open={modalState.isListingModalOpen}>
      <ListingModalContent />
    </Modal>
  );
}

const LandingPage = () => {
  const [listingsState, setListingsState] = useRecoilState(listingsAtom);
  const setSnackBarState = useSetRecoilState(snackBarAtom);
  const setListingState = useSetRecoilState(listingAtom);
  const setModalState = useSetRecoilState(modalAtom);
  const userExp = useRecoilValue(userExpSelector);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchlistingsState() {
      const data = await APIs.getListings();
      setListingsState({
        list: data,
      });
    }
    fetchlistingsState();

    // refetch when user updated
  }, [userExp]);

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
      <Grid item container justifyContent="flex-end">
        <Grid item md={2} justifyContent="flex-end">
          <Fab variant="extended" color="success" aria-label="add"
           onClick={() => {
            setModalState({
              isListingModalOpen: true,
              listingModalAction: LISTING_MODAL_ACTIONS.UPLOAD
            });
          }}>
            <AddIcon />Create Listing
          </Fab>
        </Grid>
      </Grid>
      <Grid className="m-auto grid grid-cols-4 gap-8 p-8 pt-16">
        {/* <ListingContainer listingsState={currentPageData}/> */}
        
        
        {currentPageData.map((listing) => (
          <Card
            variant="outlined"
            key={listing.listingId}
            className="hover:shadow-2xl shadow-md"
          >
            <CardContent>
              {/* <img src={listing.img} alt="preview" className="pb-2" /> */}
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-2xl">{listing.listingName}</h3>
                <div className="text-sm">
                  <DateRangeIcon/>{listing.startDate}-{listing.endDate}
                </div>
              </div>
              <div className="flex text-start items-start">
                <div className="pt-2 space-y-2">
                  <p><LocationOnIcon/>{listing.listingAddress},{listing.locationArea}</p>
                  <p><AttachMoneyIcon/>{listing.price}</p>
                </div>
                <div className="pt-1 pr-2 flex-1 flex flex-col items-end space-y-2">
                  <Button variant="outlined" className="w-24" onClick={()=>{navigate(`/listing/${listing.listingId}`)}}>
                    Detail
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    className="w-24"
                    onClick={async () => {
                      // TODO: check user ownership
                      const resp = await APIs.deleteListing(listing.listingId);
                      if (resp?.status === 200) {
                        setListingsState((prev) => ({
                          ...prev,
                          list: prev.list.filter(
                            (v) => v.listingId !== listing.listingId
                          ),
                        }));
                        setSnackBarState((prev) => ({
                          ...prev,
                          isOpen: true,
                          message: `Delete listing: ${listing.listingName}`,
                          severity: "success",
                        }));
                      } else {
                        // error message
                        const msg = resp?.response?.data
                          ? `ERROR: ${resp.response.data}`
                          : `ERROR: Failed to delete listing: ${listing.listingName}`;
                        setSnackBarState((prev) => ({
                          ...prev,
                          isOpen: true,
                          message: msg,
                          severity: "error",
                        }));
                      }
                    }}
                  >
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
      <ListingModal />
    </div>
  );
};

export default LandingPage;
