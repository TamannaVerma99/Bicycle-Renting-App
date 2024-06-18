import React, { Suspense, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { register } from "../../api/index.js";
import toast from "react-hot-toast";

const successNotify = (message) => toast.success(message);
const errorNotify = (message) => toast.error(message);

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    usertype: "user", // Default usertype is "user"
  });

  const [waiting, setWaiting] = useState(false); // State for the spinner

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setWaiting(true); // Set waiting to true when the registration request starts

    try {
      const response = await register(formData);
      console.log(response.message); // For testing purposes
      // Redirect to the login page after successful registration
      successNotify("New account created");
      navigate("/login");
    } catch (error) {
      errorNotify("Error!! Account creation failed");
      console.error(error.message);
      // Handle registration error (e.g., show an error message)
    } finally {
      setWaiting(false); // Set waiting back to false when the request completes
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        usertype: "user",
      });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="mt-4 shadow">
            <Card.Body>
              <h1 className="text-center mb-4">Register</h1>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="usertype">
                  <Form.Label>User Type</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="User"
                      name="usertype"
                      value="user"
                      checked={formData.usertype === "user"}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Admin"
                      name="usertype"
                      value="admin"
                      checked={formData.usertype === "admin"}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={waiting}
                  className="w-100"
                >
                  {waiting ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Register"
                  )}
                </Button>
              </Form>
              <div className="mt-3 text-center">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
