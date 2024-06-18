import React, { useEffect, useState } from "react";
import { Card,Container, Table } from "react-bootstrap";
import { getPendingRentRequestsUser } from "../../api/index";
import NoContent from "../common/NoContent"; // Import the NoContent component

function PendingRequests() {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await getPendingRentRequestsUser();
      setPendingRequests(response.data);
      console.log("pending requests data", pendingRequests);
    } catch (error) {
      console.log("Error fetching pending requests:", error);
    }
  };

  return (
    <Container>
      <Card
        className="text-center p-3 mb-4"
        style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.10)", borderRadius: "10px",border:"none" }}
      >
        <div className="main-heading">Pending Rent Requests</div>
      </Card>

      {pendingRequests.length === 0 ? ( // Use the NoContent component when there are no pending requests
        <NoContent
          heading="No pending rent requests at the moment."
          text="Please check back later."
        />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              {/* <th colSpan="5">
                <h4>Pending Rent Requests</h4>
              </th> */}
            </tr>
            <tr>
              <th>Request ID</th>
              <th>Bicycle Name</th>
              <th>Cost Per Hour</th>
              <th>Request Status</th>
              {/* Add more columns here as needed */}
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request) => (
              <tr key={request.request_id}>
                <td>{request.request_id}</td>
                {/* <td>{request.bicycle_id}</td> */}
                <td>{request.bicycle_name}</td>
                <td>{request.cost_per_hour}</td>
                <td>{request.request_status}</td>
                {/* Add more columns here as needed */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default PendingRequests;
