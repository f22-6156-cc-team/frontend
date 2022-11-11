import React from "react";

import { SidebarData } from "./SidebarData.js";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div style={{ width: 250 }}>
      <ul className="sidebarRows">
        {SidebarData.map((val, key) => {
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
        })}
      </ul>
      {/* <hr /> */}
    </div>
  );
}
export default Sidebar;
