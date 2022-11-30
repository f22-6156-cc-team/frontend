import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import LandingPage from "./Containers/LandingPage/LandingPage";
import Nav from "./Containers/Nav/Nav";
import UserProfile from "./Containers/User/UserProfile";
import UserPreference from "./Containers/User/UserPreference";
import UserContact from "./Containers/User/UserContact";
import UserProfileEdit from "./Containers/User/UserProfileEdit";
import UserPrefEdit from "./Containers/User/UserPrefEdit";
import UserContactEdit from "./Containers/User/UserContactEdit";
import { RecoilRoot } from "recoil";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSetRecoilState } from 'recoil';
import { userAtom } from "./utils/store";
import { login } from "./utils/login";


function App() {
  const uid = 1;

  const setUserState = useSetRecoilState(userAtom);

  useEffect(() => {
    // check local storage oauth
    login(setUserState);
  }, [setUserState]);

  
  return (
    <div className="App">
      <Nav uid={uid} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/userprofile/:uid" element={<UserProfile />} />
        <Route exact path="/userpreference/:uid" element={<UserPreference />} />
        <Route exact path="/usercontact/:uid" element={<UserContact />} />
        <Route
          exact
          path="/userprofile/:uid/edit"
          element={<UserProfileEdit />}
        />
        <Route
          exact
          path="/userpreference/:uid/edit"
          element={<UserPrefEdit />}
        />
        <Route
          exact
          path="/usercontact/:uid/edit"
          element={<UserContactEdit />}
        />
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
