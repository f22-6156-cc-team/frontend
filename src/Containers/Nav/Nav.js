import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSetRecoilState } from "recoil";
import { modalAtom } from "../../utils/store";

export default function ButtonAppBar(props) {
  const uid = props.uid;
  const userProfileUrl = `/userprofile/${uid}`;
  const homeUrl = `/`;
  const setModalAtom = useSetRecoilState(modalAtom);

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
          <Button
            color="success"
            variant="contained"
            className="mr-2"
            onClick={() => {
              setModalAtom({
                isUploadModalOpen: true,
              });
            }}
          >
            Upload
          </Button>
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
