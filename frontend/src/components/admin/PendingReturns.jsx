import React, { useEffect, useState } from "react";
import {
  getPendingReturnRequestsAdmin,
  approveReturnRequest,
} from "../../api/index";
import { Card, Button, Container, Table } from "react-bootstrap";
import NoContent from "../common/NoContent";
const PendingReturns = () => {
  const [pendingReturns, setPendingReturns] = useState([]);

  useEffect(() => {
    // Load admin's pending return requests when the component mounts
    fetchPendingReturns();
  }, []);

  const fetchPendingReturns = async () => {
    try {
      const data = await getPendingReturnRequestsAdmin();
      console.log("pending return requests admin -> ", data.data);
      setPendingReturns(data.data);
    } catch (error) {
      // Handle error
      console.log(
        "Error fetching admin's pending return requests:",
        error.message
      );
    }
  };

  const handleApproveReturnRequest = async (returnId) => {
    try {
      await approveReturnRequest(returnId);
      // Update the local state to reflect the change in status
      setPendingReturns((prevPendingReturns) =>
        prevPendingReturns.filter(
          (returnRequest) => returnRequest.return_id !== returnId
        )
      );
    } catch (error) {
      // Handle error
      console.log("Error approving return request:", error.message);
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
      <Card
        className="text-center p-3 mb-4"
        style={{
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.10)",
          borderRadius: "10px",
          border: "none",
        }}
      >
        <div className="main-heading">Pending Return Requests</div>
      </Card>
      {!pendingReturns || pendingReturns.length === 0 ? (
        <NoContent
          heading="No pending returns at the moment."
          text="Please check back later."
        />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              {/* <th colSpan="6">
                <h4>Pending Return Requests</h4>
              </th> */}
            </tr>
            <tr>
              <th>Return ID</th>
              <th>Rental ID</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Bicycle ID</th>
              <th>Bicycle Name</th>
              <th>Request Creation Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingReturns.map((request) => (
              <tr key={request.return_id}>
                <td>{request.return_id}</td>
                <td>{request.rental_id}</td>
                <td>{request.user_id}</td>
                <td>{`${request.firstName} ${request.lastName}`}</td>
                <td>{request.bicycle_id}</td>
                <td>{request.bicycle_name}</td>
                <td>
                  {convertTimestampToDateTime(request.request_created_time)}
                </td>
                <td>
                  <Button
                    variant="outline-success"
                    onClick={() =>
                      handleApproveReturnRequest(request.return_id)
                    }
                  >
                    Approve
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default PendingReturns;
