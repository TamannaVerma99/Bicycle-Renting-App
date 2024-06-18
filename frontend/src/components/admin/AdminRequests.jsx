import React, { useEffect, useState } from "react";
import { getAdminRequests } from "../../api/index";
import { Card, Container, Table } from "react-bootstrap";
import NoContent from "../common/NoContent";

const AdminRequests = () => {
  const [adminRequests, setAdminRequests] = useState([]);

  useEffect(() => {
    // Load admin's approved requests when the component mounts
    fetchAdminRequests();
  }, []);

  const fetchAdminRequests = async () => {
    try {
      const data = await getAdminRequests();
      console.log("approved rent requests ", data.data);
      setAdminRequests(data.data);
    } catch (error) {
      // Handle error
      console.log("Error fetching admin's approved requests:", error.message);
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
        <div className="main-heading">Approved Rent Requests</div>
      </Card>

      {!adminRequests || adminRequests.length === 0 ? (
        <NoContent
          heading="No approved rent requests available at the moment."
          text="Please check back later."
        />
      ) : (
        <Table striped bordered hover>
          <thead>
            {/* <tr>
              <th colSpan="4">
                <h4>Approved Rent Requests</h4>
              </th>
            </tr> */}
            <tr>
              <th>Request ID</th>
              <th>Rental ID</th>
              <th>Request User ID</th>
              <th>Request User Name</th>
              <th>Bicycle ID</th>
              <th>Bicycle Name</th>
              <th>Request Creation Time</th>
              <th>Request Granted By ID</th>
              <th>Request Granted By Name</th>
              <th>Request Approved Time</th>
            </tr>
          </thead>
          <tbody>
            {adminRequests.map((request) => (
              <tr key={request.request_id}>
                <td>{request.request_id}</td>
                <td>{request.rental_id}</td>
                <td>{request.user_id}</td>
                <td>{`${request.requested_by_firstName} ${request.requested_by_lastName}`}</td>
                <td>{request.bicycle_id}</td>
                <td>{request.bicycle_name}</td>
                <td>{convertTimestampToDateTime(request.request_date)}</td>
                <td>{request.approved_by_admin_id}</td>
                <td>{`${request.approved_by_firstName} ${request.approved_by_lastName}`}</td>
                <td>
                  {convertTimestampToDateTime(request.request_approved_time)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminRequests;
