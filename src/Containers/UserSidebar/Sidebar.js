import React from "react";

import { SidebarData } from "./SidebarData.js";
import "./Sidebar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import {
  useParams
} from "react-router-dom";

const item = (path, icon, title) => (
  <li key={1} 
      className="row" 
      id={path === window.location.pathname ? "active" : ""}
      onClick={() => (window.location.pathname = path)}
  >
    <div id="iconContainer">{icon}</div>
    <div id="titleContainer">
      <h3>{title}</h3>
    </div>
  </li>
)

function Sidebar(props) {
  const { uid } = useParams();


const items = (
  <div>
    {item(`/userprofile/${uid}`, <AccountCircleIcon />, "Profile")}
    {item(`/userpreference/${uid}`, <RoomPreferencesIcon />, "Preference")}
    {item(`/usercontact/${uid}`, <ContactPhoneIcon />, "Contact")}
  </div>
);

  return (
    <div style={{ width: 250 }}>
      <ul className="sidebarRows">
        {items}
        {/* {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={val.path === window.location.pathname ? "active" : ""}
              onClick={() => (window.location.pathname = val.path)}
            >
              <div id="iconContainer">{val.icon}</div>

              <div id="titleContainer">
                <h3>{val.title}</h3>
              </div>
            </li>
          );
        })} */}
      </ul>
      <hr />
    </div>
  );
}
export default Sidebar;
