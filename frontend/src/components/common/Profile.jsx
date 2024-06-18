import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./ProfilePage.css"; // Import your custom CSS
import { getUserProfile } from "../../api/index";

function Profile() {
  // Fetch user profile data and handle edit option here
  const [userDetails, setUserDetails] = useState({});

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setUserDetails(response.data);
    } catch (error) {
      console.log("Error fetching user details: ", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <Container className="profile-container">
      <Row>
        <Col xs={4} className="profile-image-col">
          <Image
            src={require("../../images/user.png")}
            roundedCircle
            fluid
            className="profile-image"
          />
        </Col>
        <Col xs={8} className="profile-info-col">
          <h2>Profile Information</h2>
          <p>
            <strong>First Name:</strong> {userDetails.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {userDetails.lastName}
          </p>
          <p>
            <strong>Username:</strong> {userDetails.username}
          </p>
          <p>
            <strong>Role:</strong> {userDetails.usertype}
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
