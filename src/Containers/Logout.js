import React from "react";
import { Container } from "react-bootstrap";
import { GOOGLE_JWT_NAME, JWT_NAME, JWT_REFRESH_NAME } from "../utils/const";
import { defaultUserState } from "../utils/store";

export default function Logout(setUserState) {
    setUserState(defaultUserState);
    localStorage.removeItem(GOOGLE_JWT_NAME);
    localStorage.removeItem(JWT_NAME);
    localStorage.removeItem(JWT_REFRESH_NAME);

    return (
        <Container>
            You've just logged out.
        </Container>
    );
}