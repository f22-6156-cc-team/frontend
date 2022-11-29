import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function ButtonAppBar(props) {
  const uid = props.uid;
  const userProfileUrl = `/userprofile/${uid}`
  const homeUrl = `/`
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App Name
          </Typography>
          <Button href={homeUrl} color="inherit">
            Home
          </Button>
          <Button href={userProfileUrl} color="inherit">
            User Profile
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
