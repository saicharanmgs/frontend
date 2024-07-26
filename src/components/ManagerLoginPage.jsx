import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../features/auth/authSlice.js';

export function ManagerLoginPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);


  let [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    employeeId: "",
    password: ""
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
    console.log(formData)
    // Handle form submission logic with formData
    try {
      const response = await axios.post(
        "http://localhost:9090/api/v1/login",
        formData
      );
      console.log("Form submitted:", response.data);
      dispatch(loginSuccess({ userId: response.data.employeeId, token: "response.data.token" }));
      navigate("/managerdashboard");
      toast.success(
        "Login success"
      );
      setMessage("Login success");
    } catch (error) {
      dispatch(loginFailure('User ID or password is incorrect'));
      toast.error("User Id or password is incorrect");
      setMessage("User Id or password is incorrect");
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="w-25">
          <h3 className="alert alert-primary text-center">
            Manager Log In
          </h3>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter User Id</label>
              <input
                type="number"
                className="form-control form-control-lg"
                name="employeeId"
                value={formData.name}
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

export default ManagerLoginPage;
