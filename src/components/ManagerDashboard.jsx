// components/ManagerDashboard.jsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function ManagerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate function
  const userId = useSelector((state) => state.auth.userId);

  // Handle logout and redirect to home page
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate('/'); // Redirect to the home page
  };

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <div className="text-center">
          <h1>Welcome, Manager!</h1>
          {userId ? <p>Your ID is: {userId}</p> : <p>Loading...</p>}
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default ManagerDashboard;
