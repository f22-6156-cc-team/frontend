import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSetRecoilState, useRecoilState } from "recoil";
import { modalAtom, userAtom } from "../../utils/store";
import { GoogleLogin } from "@react-oauth/google";
import { JWT_NAME } from "../../utils/const";
import { login } from "../../utils/login";

export default function ButtonAppBar(props) {
  const uid = props.uid;
  const userProfileUrl = `/userprofile/${uid}`;
  const homeUrl = `/`;
  const setModalAtom = useSetRecoilState(modalAtom);
  const [userState, setUserState] = useRecoilState(userAtom);

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
          {userState.hasLogined ? (
            <Button href={userProfileUrl} color="inherit">
              {userState.name}
            </Button>
          ) : (
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                localStorage.setItem(JWT_NAME, credentialResponse.credential);
                login(setUserState);
              }}
              onError={() => {
                console.error("Login Failed");
              }}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
