// components/ManagerDashboard.jsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { Link } from "react-router-dom";


export function EmployeeNavbar() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link to="/employeedashboard" className="navbar-brand">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/new-travelrequest" className="nav-link text-white">
                New Travel Request
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/my-travel-requests" className="nav-link text-white">
                    My Travel Requests
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br />
    </>
  );
}

export default EmployeeNavbar;
