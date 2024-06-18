import React, { useState, useEffect } from "react";
import { Card , Container, Table } from "react-bootstrap";
import { getCompletedRentsInfo } from "../../api/index";
import NoContent from "../common/NoContent";
const RentCompleteInfo =() => {
  const [completedRentals, setCompletedRentals] = useState([]);

  useEffect(() => {
    fetchCompletedRentals();
  }, []);

  const fetchCompletedRentals = async () => {
    try {
      const response = await getCompletedRentsInfo();
      console.log("complete rent info of the user ", response.data);
      setCompletedRentals(response.data);
    } catch (error) {
      console.error("Error fetching completed rentals:", error);
    }
  };
  const convertTimestampToDateTime = (timestamp) => {
    // Create a new Date object from the timestamp (in milliseconds)
    const date = new Date(timestamp);
  
    // Get the year, month, day, hours, minutes, and seconds from the date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad with leading zero if necessary
    const day = String(date.getDate()).padStart(2, '0'); // Pad with leading zero if necessary
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Combine the year, month, day, hours, minutes, and seconds to form the date-time string in the format "YYYY-MM-DD HH:MM:SS"
    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return dateTimeString;
  };


  return (
    <Container>
      <Card
        className="text-center p-3 mb-4"
        style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.10)", borderRadius: "10px",border:"none" }}
      >
        <div className="main-heading">Completed Rent Info</div>
      </Card>

      {completedRentals.length === 0 ? ( // Use the NoContent component when there are no completed rentals
        <NoContent
          heading="No completed rentals at the moment."
          text="Please check back later."
        />
      ) : (
        <Table striped bordered hover>
          <thead>
            {/* <tr>
              <th colSpan="5">
                <h4>Completed Rent Info</h4>
              </th>
            </tr> */}
            <tr>
              <th>Rental ID</th>
              <th>Bicycle</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Cost/Hour</th>
              <th>Total Cost</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {completedRentals.map((rental) => (
              <tr key={rental.rental_id}>
                <td>{rental.rental_id}</td>
                <td>{rental.bicycle_name}</td>
                <td>{convertTimestampToDateTime(rental.rental_start_date)}</td>
                <td>{convertTimestampToDateTime(rental.rental_end_date)}</td>
                <td>{rental.cost_per_hour}</td>
                <td>{rental.rental_cost}</td>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default RentCompleteInfo;
