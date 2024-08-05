import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export function ManagerTravelRequests() {
  const [travelRequests, setTravelRequests] = useState([]);
  const [comments, setComments] = useState({});
  const [travelAgentIds, setTravelAgentIds] = useState({});
  const [availableTravelAgents, setAvailableTravelAgents] = useState([]); // New state for available travel agents
  const userId = useSelector((state) => state.auth.userId); // Assume this is the manager's ID
  console.log(userId);

  useEffect(() => {
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

    const fetchAvailableTravelAgents = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/v1/get-travel-agent-ids`);
        setAvailableTravelAgents(response.data); // Store available travel agent IDs
      } catch (error) {
        console.error("Error fetching travel agent IDs", error);
      }
    };

    fetchTravelRequests();
    fetchAvailableTravelAgents(); // Fetch travel agent IDs
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
    const travelAgentId = travelAgentIds[requestId] || ""; // Get the travel agent ID from state
    try {
      await axios.put(`http://localhost:9090/api/v1/manager-travel-requests/${requestId}`, {
        managerApprovalStatus: status,
        managerComments: managerComments,
        travelAgentId: travelAgentId, // Send travel agent ID along with other data
      });
      setTravelRequests(travelRequests.map(request =>
        request.requestId === requestId
          ? { ...request, managerApprovalStatus: status, managerComments, travelAgentId }
          : request
      ));
    } catch (error) {
      console.error(`Error updating request ${requestId}`, error);
    }
  };

  const handleCommentChange = (requestId, value) => {
    setComments({ ...comments, [requestId]: value });
  };

  const handleTravelAgentIdChange = (requestId, value) => {
    setTravelAgentIds({ ...travelAgentIds, [requestId]: value });
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
            <th>User Id</th>
            <th>Manager Approval Status</th>
            <th>Manager Comments</th>
            <th>Travel Agent Approval Status</th>
            <th>Travel Agent Comments</th>
            <th>Travel Agent ID</th> {/* Dropdown for Travel Agent ID */}
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
                <td>{request.userId || 'null'}</td>
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
                  <select
                    className="form-control"
                    value={travelAgentIds[request.requestId] || ""}
                    onChange={(e) => handleTravelAgentIdChange(request.requestId, e.target.value)}
                  >
                    <option value="">Select Travel Agent ID</option>
                    {availableTravelAgents.map((agentId) => (
                      <option key={agentId} value={agentId}>{agentId}</option>
                    ))}
                  </select>
                </td>
                <td>
                  {request.managerApprovalStatus === 'Pending' && (
                    <>
                      <button
                        className="btn btn-success mr-2"
                        onClick={() => handleApproval(request.requestId, 'Approved')}
                        disabled={!travelAgentIds[request.requestId]} // Disable if no travel agent ID is selected
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleApproval(request.requestId, 'Rejected')}
                        disabled={!travelAgentIds[request.requestId]} // Disable if no travel agent ID is selected
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
