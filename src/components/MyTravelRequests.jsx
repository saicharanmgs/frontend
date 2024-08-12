import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/MyTravelRequests.css"; // Import the CSS file

export function MyTravelRequests() {
  const [travelRequests, setTravelRequests] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Fetch travel requests when the component mounts
    const fetchTravelRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/v1/my-travel-requests`, {
            params: {
              employeeId: userId,
            },
        });
        setTravelRequests(response.data);
      } catch (error) {
        console.error("Error fetching travel requests", error);
      }
    };

    fetchTravelRequests();
  }, [userId]);

  const getButtonClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'btn btn-secondary '; // Grey and disabled
      case 'Approved':
        return 'btn btn-success'; // Green
      case 'Rejected':
        return 'btn btn-danger '; // Red and disabled
      default:
        return 'btn btn-secondary'; // Default
    }
  };

  const handleViewClick = (requestId) => {
    navigate(`/ticket-details-view/${requestId}`);
  };

  return (
    <div className="container">
      <h3 className="alert alert-primary text-center">My Travel Requests</h3>
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>From</th>
            <th>Destination</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Manager Approval Status</th>
            <th>Manager Comments</th>
            <th>Travel Agent Approval Status</th>
            <th>Travel Agent Comments</th>
            <th>Ticket Details</th>
          </tr>
        </thead>
        <tbody>
          {travelRequests.length > 0 ? (
            travelRequests.map((request) => (
              <tr key={request.requestId}>
                <td>{request.requestId}</td>
                <td>{request.fromLocation}</td>
                <td>{request.destination}</td>
                <td>{new Date(request.startDate).toLocaleDateString()}</td>
                <td>{new Date(request.endDate).toLocaleDateString()}</td>
                <td>{request.amount}</td>
                <td>{request.reason}</td>
                <td>
                  <button className={getButtonClass(request.managerApprovalStatus)}>
                    {request.managerApprovalStatus}
                  </button>
                </td>
                <td>{request.managerComments}</td>
                <td>
                  <button className={getButtonClass(request.travelAgentApprovalStatus)}>
                    {request.travelAgentApprovalStatus}
                  </button>
                </td>
                <td>{request.travelAgentComments}</td>
                <td>
                  <button
                    className="btn btn-info"
                    disabled={
                      request.managerApprovalStatus !== 'Approved' ||
                      request.travelAgentApprovalStatus !== 'Approved'
                    }
                    onClick={() => handleViewClick(request.requestId)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center">No travel requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <Link to="/new-travelrequest" className="btn btn-primary">Create New Request</Link>
    </div>
  );
}

export default MyTravelRequests;
