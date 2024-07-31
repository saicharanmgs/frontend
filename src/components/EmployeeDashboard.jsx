// components/EmployeeDashboard.jsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

export function EmployeeDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate function
  const userId = useSelector((state) => state.auth.userId);
  const managerId = useSelector((state) => state.auth.managerId);

  // Handle logout and redirect to home page
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate('/'); // Redirect to the home page
  };

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="text-center">
          <h1>Welcome, Employee!</h1>
          {userId ? <p>Your ID is: {userId}</p> : <p>Loading...</p>}
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeDashboard;
