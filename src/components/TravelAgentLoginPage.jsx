import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice"; // Import your action

export function TravelAgentLoginPage() {
  const [formData, setFormData] = useState({
    travelAgentId: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get the dispatch function

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9090/api/v1/travel-agent-login",
        formData
      );

      // Assuming response.data contains the travel agent information including ID and token
      const { travelAgentId } = response.data;

      // Dispatch login success with travel agent details
      dispatch(loginSuccess({ travelAgentId }));

      toast.success("Login success");
      setMessage("Login success");

      // Redirect to the travel agent dashboard on success
      navigate("/travel-agent-dashboard");
    } catch (error) {
      toast.error("User Id or password is incorrect");
      setMessage("User Id or password is incorrect");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="w-25">
        <h3 className="alert alert-primary text-center">TravelAgent Log In</h3>
        <hr />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter Travel Agent Id</label>
            <input
              type="number"
              className="form-control form-control-lg"
              name="travelAgentId"
              value={formData.travelAgentId}
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

export default TravelAgentLoginPage;
