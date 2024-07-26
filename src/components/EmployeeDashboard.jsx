// components/ManagerDashboard.jsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { Link } from "react-router-dom";


export function EmployeeDashboard() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const managerId = useSelector((state) => state.auth.managerId);
  const handleLogout = () => {
    dispatch(logout());
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
