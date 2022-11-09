import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './Components/LandingPage/LandingPage';
import Nav from './Components/Nav/Nav';
import UserProfile from './Components/User/UserProfile';
import UserPreference from './Components/User/UserPreference';
import UserContact from './Components/User/UserContact';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
        </Routes>
        <Routes>
          <Route exact path="/userprofile" element={<UserProfile/>}/>
        </Routes>
        <Routes>
          <Route exact path="/userpreference" element={<UserPreference/>}/>
        </Routes>
        <Routes>
          <Route exact path="/usercontact" element={<UserContact/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
