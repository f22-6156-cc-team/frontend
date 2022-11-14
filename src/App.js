import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react'
import LandingPage from './Containers/LandingPage/LandingPage';
import Nav from './Containers/Nav/Nav';
import UserProfile from './Containers/User/UserProfile';
import UserPreference from './Containers/User/UserPreference';
import UserContact from './Containers/User/UserContact';

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
          <Route exact path="/userpreference" element={<UserPreference/>}/>
        </Routes>
        <Routes>
          <Route exact path="/user/:uid/contact" element={<UserContact/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
