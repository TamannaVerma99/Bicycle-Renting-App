import React, { useState, useEffect } from "react";
import { Card , Container, Table } from "react-bootstrap";
import { getPendingReturnRequests } from "../../api/index";
import NoContent from "../common/NoContent"; // Import the NoContent component

function PendingReturns() {
  const [returnRequests, setReturnRequests] = useState([]);

  useEffect(() => {
    fetchPendingReturnRequests();
  }, []);

  const fetchPendingReturnRequests = async () => {
    try {
      const response = await getPendingReturnRequests();
      console.log("pending requests data", response.data);
      setReturnRequests(response.data);
    } catch (error) {
      console.error("Error fetching pending return requests:", error);
    }
  };

  return (
    <Container>
      <Card
        className="text-center p-3 mb-4"
        style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.10)", borderRadius: "10px",border:"none" }}
      >
        <div className="main-heading">Pending Returns</div>
      </Card>

      {returnRequests.length === 0 ? ( // Use the NoContent component when there are no pending return requests
        <NoContent
          heading="No pending return requests at the moment."
          text="Please check back later."
        />
      ) : (
        <Table striped bordered hover>
          <thead>
            {/* <tr>
              <th colSpan="5">
                <h4>Pending Return Requests</h4>
              </th>
            </tr> */}
            <tr>
              <th>Return ID</th>
              <th>Rental ID</th>
              {/* <th>Return Date</th> */}
              <th>Bicycle Name</th>
              <th>Cost per hour</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {returnRequests.map((returnRequest) => (
              <tr key={returnRequest.return_id}>
                <td>{returnRequest.return_id}</td>
                <td>{returnRequest.rental_id}</td>
                {/* <td>{returnRequest.return_date}</td> */}
                <td>{returnRequest.bicycle_name}</td>
                <td>{returnRequest.cost_per_hour}</td>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default PendingReturns;
