import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export function DirectorTravelRequests() {
  const [travelRequests, setTravelRequests] = useState([]);
  const [comments, setComments] = useState({});
  const userId = useSelector((state) => state.auth.userId); // Assume this is the director's ID

  useEffect(() => {
    const fetchTravelRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/v1/director-travel-requests`, {
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
    const managerComments = comments[requestId] || "";
    const travelAgentId = travelRequests.find(req => req.requestId === requestId)?.travelAgentId || ""; // Get the travel agent ID from request data
    try {
      await axios.put(`http://localhost:9090/api/v1/director-travel-requests-v2/${requestId}`, {
        managerApprovalStatus: status,
        managerComments: "Overridden by director",
        travelAgentApprovalStatus: status, 
        travelAgentComments:"Overridden by director"
      });
      setTravelRequests(travelRequests.map(request =>
        request.requestId === requestId
          ? { ...request,
            managerApprovalStatus: status,
            managerComments :'Overridden by director',
            travelAgentApprovalStatus:status,
            travelAgentComments: 'Overridden by director'
        }
          : request
      ));
    } catch (error) {
      console.error(`Error updating request ${requestId}`, error);
    }
  };

  const handleCommentChange = (requestId, value) => {
    setComments({ ...comments, [requestId]: value });
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
            <th>Travel Agent ID</th> {/* Display Travel Agent ID instead of dropdown */}
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
                <td>{request.employeeId}</td>
                <td>
                  <button className={getButtonClass(request.managerApprovalStatus)}>
                    {request.managerApprovalStatus}
                  </button>
                </td>
                <td>
                  {request.managerApprovalStatus === 'Pending' ? (
                    <textarea
                      className="form-control"
                      placeholder="Enter comments"
                      value={comments[request.requestId] || ""}
                      onChange={(e) => handleCommentChange(request.requestId, e.target.value)}
                    />
                  ) : (
                    request.managerComments
                  )}
                </td>
                <td>
                  <button className={getButtonClass(request.travelAgentApprovalStatus)}>
                    {request.travelAgentApprovalStatus}
                  </button>
                </td>
                <td>{request.travelAgentComments}</td>
                <td>
                  {/* Displaying Travel Agent ID directly from the request data */}
                  {request.travelAgentId || 'N/A'} {/* Show 'N/A' if no agent is assigned */}
                </td>
                <td>
                  {( request.managerApprovalStatus == 'Rejected'|| request.travelAgentApprovalStatus == 'Rejected')&&(
                    <>
                      <button
                        className="btn btn-success mr-2"
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

export default DirectorTravelRequests;
