import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../features/auth/authSlice.js";

export function EmployeeLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  let [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    employeeId: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:9090/api/v1/login",
        formData
      );
      console.log("Form submitted:", response.data);

      dispatch(
        loginSuccess({
          userId: response.data.employeeId,
          managerId: response.data.managerId,
          designation: response.data.designation
        })
      );

      const dashboardPath = getDashboardPath(response.data.designation);
      navigate(dashboardPath);
      toast.success("Login success");
      setMessage("Login success");
    } catch (error) {
      dispatch(loginFailure("User ID or password is incorrect"));
      toast.error("User Id or password is incorrect");
      setMessage("User Id or password is incorrect");
    }
  };

  const getDashboardPath = (designation) => {
    switch (designation) {
      case "Employee":
        return "/employeedashboard";
      case "Manager":
        return "/managerdashboard";
      case "Travel Agent":
        return "/travel-agent-dashboard-v2";
      case "Director":
        return "/directordashboard"
      default:
        return "/employeedashboard";
    }
  };

  // Define inline styles
  const containerStyle = {
    backgroundImage: 'url("https://wallpapercave.com/wp/wp2939910.jpg")', // Path to your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Full viewport height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const loginBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White color with 80% opacity
    padding: '15px', // Adjust padding to fit the smaller box
    borderRadius: '8px', // Slightly smaller border-radius
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Slightly smaller shadow
    width: '100%', // Width as a percentage of the parent container
    maxWidth: '300px', // Maximum width of the login box
    height: 'auto', // Automatically adjust height based on content
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <h3 className="alert alert-primary text-center">Employee Log In</h3>
        <hr />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter User Id</label>
            <input
              type="number"
              className="form-control form-control-lg"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
            />
          </div>
          <br />

          <div className="form-group">
            <label>Enter Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Log in"
              className="btn btn-primary btn-lg w-100"
            />
          </div>
        </form>
        <br />

        <h6>{message}</h6>
      </div>
    </div>
  );
}

export default EmployeeLoginPage;
