import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { Link, useNavigate } from "react-router-dom";

export function ManagerNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link to="/managerdashboard" className="navbar-brand">
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
                <Link to="/manager-addemployee" className="nav-link text-white">
                  Add Employee
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/manager-travel-requests" className="nav-link text-white">
                  Travel Requests
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/manager-myemployees" className="nav-link text-white">
                  My Employees
                </Link>
              </li>
              <li className="nav-item">
                <button 
                  onClick={handleLogout} 
                  className="btn btn-outline-light"
                >
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

export default ManagerNavbar;
