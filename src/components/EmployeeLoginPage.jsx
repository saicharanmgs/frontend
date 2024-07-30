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
    // Handle form submission logic with formData
    try {
      const response = await axios.post(
        "http://localhost:9090/api/v1/login",
        formData
      );
      console.log("Form submitted:", response.data);
      
      // Dispatch login success action
      dispatch(
        loginSuccess({
          userId: response.data.employeeId,
          managerId: response.data.managerId,
          designation: response.data.designation // Assuming designation is returned
        })
      );

      // Get the dashboard path based on the designation
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

  // Function to get the dashboard path based on designation
  const getDashboardPath = (designation) => {
    switch (designation) {
      case "Employee":
        return "/employeedashboard";
      case "Manager":
        return "/managerdashboard";
      case "Travel Agent":
        return "/travelagentdashboard";
      default:
        return "/employeedashboard"; // Default path if designation is unknown
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="w-25">
          <h3 className="alert alert-primary text-center">Employee Log In</h3>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter User Id</label>
              <input
                type="number"
                className="form-control form-control-lg"
                name="employeeId"
                value={formData.employeeId} // Corrected from name to employeeId
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
    </>
  );
}

export default EmployeeLoginPage;
