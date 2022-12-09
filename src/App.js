import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import LandingPage from "./Containers/LandingPage/LandingPage";
import Nav from "./Containers/Nav/Nav";
import UserProfile from "./Containers/User/UserProfile";
import UserPreference from "./Containers/User/UserPreference";
import UserContact from "./Containers/User/UserContact";
import ListingDetail from "./Containers/Listing/ListingDetail";
import Logout from "./Containers/Logout";
import Signup from "./Containers/Signup";
import { RecoilRoot } from "recoil";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { snackBarAtom, userAtom } from "./utils/store";
import { login } from "./utils/login";
import { Snackbar } from "@mui/material";
import { useRecoilState } from "recoil";
import { Alert } from "@mui/material";

function Message() {
  const [snackBarState, setSnackBarState] = useRecoilState(snackBarAtom);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={snackBarState.isOpen}
      autoHideDuration={2000}
    >
      <Alert
        onClose={() => {
          setSnackBarState((prev) => ({
            ...prev,
            isOpen: false,
            message: "",
          }));
        }}
        severity={snackBarState.severity}
      >
        {snackBarState.message}
      </Alert>
    </Snackbar>
  );
}

function App() {
  const [userState, setUserState] = useRecoilState(userAtom);
  const uid = userState?.uid;

  useEffect(() => {
    // check local storage oauth
    login(setUserState);
  }, [setUserState]);

  return (
    <div className="App">
      <Nav uid={uid}/>
      <Message />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup uid={uid}/>} />
        <Route path="/userprofile/:uid" element={<UserProfile />} />
        <Route exact path="/userpreference/:uid" element={<UserPreference />} />
        <Route exact path="/usercontact/:uid" element={<UserContact />} />
        <Route exact path="/listing/:lid" element={<ListingDetail />} />
      </Routes>
    </div>
  );
}

export default function Wrapper() {
  return (
    <RecoilRoot>
      <GoogleOAuthProvider clientId="435727038331-9bupi3iank4f5tsshc56ruvt494nc5lo.apps.googleusercontent.com">
        <Router>
          <App />
        </Router>
      </GoogleOAuthProvider>
    </RecoilRoot>
  );
}
