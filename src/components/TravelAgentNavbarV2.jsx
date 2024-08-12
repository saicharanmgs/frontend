// components/TravelAgentNavbar.jsx

import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { Link , useNavigate } from "react-router-dom";

export function TravelAgentNavbarV2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navbarStyle = {
    backgroundColor: "#ffffff",
    color: "#000000"
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link to="/travel-agent-dashboard-v2" className="navbar-brand">
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
                <Link to="/travel-agent-requests-v2" className="nav-link text-white">
                  My Requests
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link text-white">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-light">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br />
    </>
  );
}

export default TravelAgentNavbarV2;
