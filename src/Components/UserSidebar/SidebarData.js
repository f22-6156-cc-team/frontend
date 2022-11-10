import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

export const SidebarData = [
  {
    title: "User Profile",
    path: "/userprofile",
    icon: <AccountCircleIcon />,
  },
  {
    title: "User Preference",
    path: "/userpreference",
    icon: <RoomPreferencesIcon />,
  },
  {
    title: "User Contact",
    path: "/usercontact",
    icon: <ContactPhoneIcon />,
  }
];