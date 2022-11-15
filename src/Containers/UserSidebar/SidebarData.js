import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

export const SidebarData = [
  {
    title: "Profile",
    path: "`/userprofile/${uid}`",
    icon: <AccountCircleIcon />,
  },
  {
    title: "Preference",
    path: "/userpreference",
    icon: <RoomPreferencesIcon />,
  },
  {
    title: "Contact",
    // path: `/user/${uid}/contact`,
    icon: <ContactPhoneIcon />,
  },
];
