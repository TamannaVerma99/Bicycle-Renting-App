import React, { useState, useEffect } from "react";
import { Container, Button, Card, Alert } from "react-bootstrap";
import { getAllBicycles, deleteBicycle } from "../../api/index";
import { Link } from "react-router-dom";
import "./index.css"; // Import the same styles used in Home.jsx
import HomePageCarousel from "../common/HomePageCarousel";
import NoContent from "../common/NoContent";
function Home() {
  const [bicycles, setBicycles] = useState([]);

  useEffect(() => {
    fetchAllBicycles();
  }, []);

  const fetchAllBicycles = async () => {
    try {
      const response = await getAllBicycles();
      setBicycles(response.data);
      console.log("data of cycles ", bicycles);
    } catch (error) {
      console.error("Error fetching bicycles:", error);
    }
  };

  const handleDelete = async (bicycleId) => {
    try {
      await deleteBicycle(bicycleId);
      // After deletion, fetch the updated list of bicycles
      setBicycles((bicycles) =>
        bicycles.filter((bicycle) => bicycle.bicycle_id !== bicycleId)
      );
    } catch (error) {
      console.error("Error deleting bicycle:", error);
    }
  };

  const convertTimestampToDateTime = (timestamp) => {
    // Create a new Date object from the timestamp (in milliseconds)
    const date = new Date(timestamp);

    // Get the year, month, day, hours, minutes, and seconds from the date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1 and pad with leading zero if necessary
    const day = String(date.getDate()).padStart(2, "0"); // Pad with leading zero if necessary
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Combine the year, month, day, hours, minutes, and seconds to form the date-time string in the format "YYYY-MM-DD HH:MM:SS"
    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return dateTimeString;
  };

  return (
    <Container>
      <div className="carousel-container">
        <div className="carousel-container-main lf-s">
          <HomePageCarousel />
        </div>
      </div>
      <div className="bicycle-list-container">
        <Card
          className="text-center p-3 mb-4"
          style={{
            boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.10)",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <div className="main-heading">All Bicycles</div>
        </Card>
        <div className="bicycle-list">
          {!bicycles ||
            (bicycles.length === 0 && (
              <NoContent
                heading="No bicycles available at the moment."
                text="Please check back later or add bicycles to the app."
              />
            ))}
          {bicycles.map((bicycle, index) => (
            <Card
              key={bicycle.bicycle_id}
              className={
                index % 3 === 0 ? "mb-3 bicycle-card" : "mb-3 bicycle-card ml"
              }
              style={{
                width: "32.4%",
                minWidth: "200px",
                padding: "20px 0px",
                boxShadow: "0 4px 8px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "8px",
                border: "none",
              }}
            >
              <Card.Body>
                <Card.Title>{bicycle.bicycle_name}</Card.Title>

                <Card.Text>Bicycle Id: {bicycle.bicycle_id}</Card.Text>
                <Card.Text>
                  Availability Status:{" "}
                  {bicycle.available === 1 ? "Available" : "Not Available"}
                </Card.Text>
                <Card.Text>Cost per Hour: {bicycle.cost_per_hour}</Card.Text>
                <Card.Text>
                  Added By:{" "}
                  {`${bicycle.added_by_firstName} ${bicycle.added_by_lastName}`}
                </Card.Text>
                <Card.Text>Added By Id: {bicycle.added_by_user_id}</Card.Text>
                <Card.Text>
                  Added By Username: {bicycle.added_by_username}
                </Card.Text>
                <Card.Text>
                  Added By Type: {bicycle.added_by_usertype}
                </Card.Text>
                <Card.Text>
                  Created Time:{" "}
                  {convertTimestampToDateTime(bicycle.created_time)}
                </Card.Text>
                <div style={{ display: "flex" }}>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(bicycle.bicycle_id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Home;
