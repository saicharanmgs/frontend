// components/TravelAgentDashboard.jsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

export function TravelAgentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const travelAgentId = useSelector((state) => state.auth.travelAgentId);
    console.log(travelAgentId);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
      <div className="text-center">
        <h1>Welcome, Travel Agent!</h1>
        {travelAgentId ? <p>Your ID is: {travelAgentId}</p> : <p>Loading...</p>}
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>
    </div>
  );
}

export default TravelAgentDashboard;
