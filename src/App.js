import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react'
import LandingPage from './Containers/LandingPage/LandingPage';
import Nav from './Containers/Nav/Nav';
import UserProfile from './Containers/User/UserProfile';
import UserPreference from './Containers/User/UserPreference';
import UserContact from './Containers/User/UserContact';
import UserProfileEdit from './Containers/User/UserProfileEdit'
import UserPrefEdit from './Containers/User/UserPrefEdit';
import UserContactEdit from './Containers/User/UserContactEdit';
import ListingDetail from './Containers/Listing/ListingDetail';

function App() {
  const uid = 1;

  return (
    <div className="App">
      <Nav uid={uid}/>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
        </Routes>
        <Routes>
          <Route path="/userprofile/:uid" element={<UserProfile/>}/>
        </Routes>
        <Routes>
          <Route exact path="/userpreference/:uid" element={<UserPreference/>}/>
        </Routes>
        <Routes>
          <Route exact path="/usercontact/:uid" element={<UserContact/>}/>
        </Routes>
        <Routes>
          <Route exact path="/userprofile/:uid/edit" element={<UserProfileEdit/>}/>
        </Routes>
        <Routes>
          <Route exact path="/userpreference/:uid/edit" element={<UserPrefEdit/>}/>
        </Routes>
        <Routes>
          <Route exact path="/usercontact/:uid/edit" element={<UserContactEdit/>}/>
        </Routes>
        <Routes>
          <Route exact path="/listing/:lid" element={<ListingDetail/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
