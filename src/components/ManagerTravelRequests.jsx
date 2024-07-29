import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function ManagerTravelRequests() {
  const [travelRequests, setTravelRequests] = useState([]);
  const userId = useSelector((state) => state.auth.userId); // Assume this is the manager's ID
  console.log(userId);

  useEffect(() => {
    // Fetch travel requests that need manager approval when the component mounts
    const fetchTravelRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/v1/manager-travel-requests`, {
            params: {
              managerId: userId,
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
        return 'btn btn-secondary disabled'; // Grey and disabled
      case 'Approved':
        return 'btn btn-success'; // Green
      case 'Rejected':
        return 'btn btn-danger disabled'; // Red and disabled
      default:
        return 'btn btn-secondary'; // Default
    }
  };

  const handleApproval = async (requestId, status) => {
    try {
      await axios.put(`http://localhost:9090/api/v1/manager-travel-requests/${requestId}`, {
        managerApprovalStatus: status,
      });
      // Update local state to reflect the change
      setTravelRequests(travelRequests.map(request =>
        request.requestId === requestId
          ? { ...request, managerApprovalStatus: status }
          : request
      ));
    } catch (error) {
      console.error(`Error updating request ${requestId}`, error);
    }
  };

  return (
    <div className="container">
      <h3 className="alert alert-primary text-center">Travel Requests for Approval</h3>
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
            <th>Employee</th>
            <th>Manager Approval Status</th>
            <th>Manager Comments</th>
            <th>Travel Agent Approval Status</th>
            <th>Travel Agent Comments</th>
            <th>Actions</th>
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
                <td>{request.employeeName}</td>
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
                  {request.managerApprovalStatus === 'Pending' && (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => handleApproval(request.requestId, 'Approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleApproval(request.requestId, 'Rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" className="text-center">No travel requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerTravelRequests;
