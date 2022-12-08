import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSetRecoilState, useRecoilState } from "recoil";
import { modalAtom, snackBarAtom, userAtom } from "../../utils/store";
import { GoogleLogin } from "@react-oauth/google";
import { GOOGLE_JWT_NAME, JWT_NAME, JWT_REFRESH_NAME } from "../../utils/const";
import { login } from "../../utils/login";
import { APIs } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";

export default function ButtonAppBar(props) {
  const homeUrl = `/`;
  const userProfileUrl = `/userprofile/${props?.uid}`
  const setModalAtom = useSetRecoilState(modalAtom);
  const [userState, setUserState] = useRecoilState(userAtom);
  const setSnackBarState = useSetRecoilState(snackBarAtom);
  const navigate = useNavigate();

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
                isListingModalOpen: true,
              });
            }}
          >
            Upload
          </Button>
          <Button href={homeUrl} color="inherit">
            Home
          </Button>
          {userState.hasLogined ? (
            <div>
              <Button href={userProfileUrl} color="inherit">
              {userState.name}
              </Button>
              <Button color="inherit" onClick={()=>{Logout(setUserState)}}>
                Logout
              </Button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const { credential } = credentialResponse;
                const resp = await APIs.signAccount(credential);
                // console.log("resp", resp);
                       
                if (resp.status !== 200) {
                  const msg = resp?.response?.data
                    ? `ERROR: ${resp.response.data}`
                    : `ERROR: Failed to sign account`;
                  setSnackBarState((prev) => ({
                    ...prev,
                    isOpen: true,
                    message: msg,
                    severity: "error",
                  }));
                  return;
                }

                localStorage.setItem(GOOGLE_JWT_NAME, credential);
                localStorage.setItem(JWT_NAME, resp.data.access_token);
                localStorage.setItem(JWT_REFRESH_NAME, resp.data.refresh_token);
                login(setUserState);

                if (resp.data.is_new){
                  navigate(`/signup`)
                }
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
