import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { APIs } from '../utils/api';
import { Select, MenuItem } from '@mui/material';

export default function Signup(props) {
    const [username, setUserName] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [gender, setGender] = useState("Female");
    const [wake, setWake] = useState("before 7AM");
    const [sleep, setSleep] = useState("before 10PM");
    const [cook, setCook] = useState("never");
    const [clean, setClean] = useState("never");
    const [pet, setPet] = useState("1");
    const [smoke, setSmoke] = useState("1");
    const [party, setParty] = useState("1");
    const [guest, setGuest] = useState("1");
    const [email, setEmail] = useState();
    const [emailType, setEmailType] = useState("Personal")
    const [phone, setPhone] = useState();
    const [phoneType, setPhoneType] = useState("Home")
    const onUname = (e) => setUserName(e.target.value);
    const onFname = (e) => setFirstName(e.target.value);
    const onLname = (e) => setLastName(e.target.value);
    const onGender = (e) => setGender(e.target.value);
    const onWake = (e) => setWake(e.target.value);
    const onSleep = (e) => setSleep(e.target.value);
    const onCook= (e) => setCook(e.target.value);
    const onClean = (e) => setClean(e.target.value);
    const onPet = (e) => setPet(e.target.value);
    const onSmoke = (e) => setSmoke(e.target.value);
    const onParty = (e) => setParty(e.target.value);
    const onGuest = (e) => setGuest(e.target.value);
    const onEmail = (e) => setEmail(e.target.value);
    const onEmailType = (e) => setEmailType(e.target.value);
    const onPhone = (e) => setPhone(e.target.value);
    const onPhoneType = (e) => setPhoneType(e.target.value);
    const userId = props?.uid
    // signup
    const handleSignup = async (e) => {
        e.preventDefault();
        const userInfo = {
            "userId" : userId,
            "isActive" : "1",
            "isAdmin" : "0",
            "username" : username,
            "firstName" : firstName,
            "lastName" : lastName
        }
        console.log("uid", userId);
        const resp = await APIs.editUser(userId, userInfo);
        // console.log(resp);        
        const prefData = {
          'userId': userId,
          'gender': gender,
          "sleepingTime": sleep,
          'wakeupTime': wake,
          'cookingFrequency': cook,
          'cleaningFrequency': clean,
          'isPetFriendly': pet,
          'isSmokingFriendly': smoke,
          'isPartyFriendly': party,
          'isGuestWelcome': guest
        };
        const rsp = await APIs.createPreference(userId, prefData);
        // console.log(rsp)
        // const contactData = {
        //   "user_id": userId,
        //   "is_active": "1"
        // }
        // const rsp3 = await APIs.createContact(userId, contactData);
        // const emailData = {
        //   "user_id": userId,
        //   "is_active": "1",
        //   "email_type": emailType,
        //   "email_address": email
        // }
        // const rsp1 = await APIs.createEmail(userId, emailData);
        const phoneData = {
          "user_id": userId,
          "phone_id": userId,
          "is_active": "1",
          "phoneType": phoneType,
          "number": phone
        }
        const rsp2 = await APIs.createPhone(userId, phoneData);
    }

  return (
    <div>
    <Container>
    <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <p className=" mb-5">Please Sign Up!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formU">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control onChange={onUname} placeholder="Enter username" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control onChange={onFname} placeholder="Enter First Name" />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control  onChange={onLname} placeholder="Enter Last Name" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control  onChange={onPhone} placeholder="Enter Phone Number" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Phone Type</Form.Label>
                        <Select margin="dense" fullWidth variant="standard" defaultValue={"Home"} onChange={onPhoneType}>
                          <MenuItem value="Home">Home</MenuItem>
                          <MenuItem value="Work">Work</MenuItem>
                          <MenuItem value="Mobile">Mobile</MenuItem>
                        </Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Gender Preference</Form.Label>
                        <Select margin="dense" fullWidth variant="standard" defaultValue={"Female"} onChange={onGender}>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Others">Others</MenuItem>
                        </Select>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Wakeup Time</Form.Label>
                        <Select margin="dense" fullWidth variant="standard" defaultValue={"before 7AM"} onChange={onWake}>
                          <MenuItem value="before 7AM">before 7AM</MenuItem>
                          <MenuItem value="7AM to 9AM">7AM to 9AM</MenuItem>
                          <MenuItem value="after 9AM">after 9AM</MenuItem>
                        </Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Sleeping Time</Form.Label>
                        <Select margin="dense" fullWidth variant="standard" defaultValue={"before 10PM"} onChange={onSleep}>
                          <MenuItem value="before 10PM">before 10PM</MenuItem>
                          <MenuItem value="10PM to 12PM">10PM to 12PM</MenuItem>
                          <MenuItem value="after 12PM">after 12PM</MenuItem>
                        </Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Cooking Frequency</Form.Label>
                        <Select margin="dense" fullWidth variant="standard" defaultValue={"never"} onChange={onCook}>
                          <MenuItem value="never">Never</MenuItem>
                          <MenuItem value="rarely">Rarely</MenuItem>
                          <MenuItem value="often">Often</MenuItem>
                          <MenuItem value="everyday">Everyday</MenuItem>
                        </Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Cleaning Frequency</Form.Label>
                        <Select margin="dense" fullWidth variant="standard" defaultValue={"never"} onChange={onClean}>
                          <MenuItem value="never">Never</MenuItem>
                          <MenuItem value="rarely">Rarely</MenuItem>
                          <MenuItem value="often">Often</MenuItem>
                          <MenuItem value="everyday">Everyday</MenuItem>
                        </Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Pet Friendly</Form.Label>
                        <Select margin="dense" fullWidth variant="standard" defaultValue={"1"} onChange={onPet}>
                          <MenuItem value="1">Yes</MenuItem>
                          <MenuItem value="0">No</MenuItem>
                        </Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Smoking Friendly</Form.Label>
                        <Select margin="dense" fullWidth variant="standard" defaultValue={"1"} onChange={onSmoke}>
                          <MenuItem value="1">Yes</MenuItem>
                          <MenuItem value="0">No</MenuItem>
                        </Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Party Friendly</Form.Label>
                        <Select margin="dense" fullWidth variant="standard" defaultValue={"1"} onChange={onParty}>
                          <MenuItem value="1">Yes</MenuItem>
                          <MenuItem value="0">No</MenuItem>
                        </Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Guest Friendly</Form.Label>
                        <Select margin="dense" fullWidth variant="standard" defaultValue={"1"} onChange={onGuest}>
                          <MenuItem value="1">Yes</MenuItem>
                          <MenuItem value="0">No</MenuItem>
                        </Select>
                      </Form.Group>

                      <div className="d-grid">
                        <Button onClick={handleSignup} variant="primary" type="submit">
                          Signup
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
    </Row>
    </Container>
    </div>
  );
}
