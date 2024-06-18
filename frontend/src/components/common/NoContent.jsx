import React from "react";
import { Alert } from "react-bootstrap";
const NoContent = ({ heading, text }) => {
  return (
    <div
      className="text-center mt-5 mb-5"
      style={{
        width: "100%",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Alert variant="info" style={{ width: "max-content" }}>
        <Alert.Heading>{heading}</Alert.Heading>
        <p>{text}</p>
      </Alert>
    </div>
  );
};

export default NoContent;
