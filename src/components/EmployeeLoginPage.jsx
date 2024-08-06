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

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    UserId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const { userId, password } = formData;

    // Validate Employee ID
    if (!userId.trim()) {
      newErrors.userId = "Employee ID is required.";
    }

    // Validate Password
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    dispatch(loginRequest());
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
    switch (designation.toLowerCase()) {
      case "employee":
        return "/employeedashboard";
      case "manager":
        return "/managerdashboard";
      case "travel agent":
        return "/travel-agent-dashboard-v2";
      case "director":
        return "/directordashboard";
      default:
        return "/employeedashboard";
    }
  };

  // Define inline styles
  const containerStyle = {
    backgroundImage: 'url("https://wallpapercave.com/wp/wp2939910.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const formstyle = {
    color : 'aliceblue'
  }

  const loginBoxStyle = {
    backgroundColor: 'rgb(255 255 255 / 0%)',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
  };
const headingStyle = {
  backgroundColor: '#452f1200',
  color: 'aliceblue',
  borderColor: '#3e3e3e'
}
  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <h3 className="alert alert-primary text-center" style = {headingStyle}>Employee Log In</h3>
        <hr />

        <form onSubmit={handleSubmit} style= {formstyle}>
          <div className="form-group">
            <label>Enter User ID</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.userId ? 'is-invalid' : ''}`}
              name="userId"
              value={formData.userId}
              onChange={handleChange}
            />
            {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
          </div>
          <br />

          <div className="form-group">
            <label>Enter Password</label>
            <input
              type="password"
              className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
